/*
  Experimental script for uploading markdown files using the
  POST /:agentId/memories/upload-knowledge endpoint.
*/

import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directoriesToIngest = [
  '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch03-bitcoin-core/',
  '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch04-keys-and-addresses/',
  '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch05-wallets/',
  '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch06-transactions/',
  '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch07-authorization-authentication/',
  '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch08-signatures/',
  '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch09-fees/',
  '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch10-network/',
  '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch11-blockchain/',
  '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch12-mining/',
  '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch13-security/',
  '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch14-applications/',
  '../knowledge/shared/websites/mastering-bitcoin-cash/ch01-what-is-bitcoin-cash/',
  '../knowledge/shared/websites/mastering-bitcoin-cash/ch02-how-bitcoin-cash-works/',
  '../knowledge/shared/websites/mastering-bitcoin-cash/ch03-keys-addresses-and-wallets/',
  '../knowledge/shared/websites/mastering-bitcoin-cash/ch04-transactions/',
  '../knowledge/shared/websites/mastering-bitcoin-cash/ch05-bitcoin-cash-network/',
  '../knowledge/shared/websites/mastering-bitcoin-cash/ch06-the-blockchain/',
  '../knowledge/shared/websites/mastering-bitcoin-cash/ch08-bitcoin-cash-security/',
  // '../knowledge/shared/code/bch-js/'
]

// Consume the directoriesToIngest array and return an array of file paths
// representing all the files in all the directories.
function getFilePaths() {
  try {
    const filePaths = []

    directoriesToIngest.forEach(directory => {
      const directoryPath = path.join(__dirname, directory)
      const files = fs.readdirSync(directoryPath)

      files.forEach(file => {
        const filePath = path.join(directoryPath, file)
        filePaths.push(filePath)
      })
    })

    return filePaths

  } catch(err) {
    console.error('Error in getFilePaths()')
    throw err
  }
}

async function uploadKnowledgeToAgent(agentId, filePaths) {
  // Create a new form data instance
  const formData = new FormData();

  // Add each file to the form data
  filePaths.forEach(filePath => {
    formData.append('files', fs.createReadStream(filePath), {
      filename: path.basename(filePath)
    });
  });

  try {
    // Make the POST request
    const response = await axios({
      method: 'post',
      url: `http://localhost:3000/api/agents/${agentId}/memories/upload-knowledge`,
      data: formData,
      headers: {
        ...formData.getHeaders(),
        // Add any additional headers if needed
        // 'Authorization': 'Bearer your-token-here'
      }
    });

    // Handle successful response
    console.log('Upload successful!')
    // console.log('response.data', response.data)
    console.log('Uploaded files:', response.data.data);

    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Upload failed:', error.response?.data || error.message);
    throw error;
  }
}

// Example usage
async function main() {
  const agentId = 'b850bc30-45f8-0041-a00a-83df46d8555d';
  // const filesToUpload = [
  //   path.join(__dirname, '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch03_bitcoin-core.md'),
  //   path.join(__dirname, '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch04_keys.md')
  // ];

  const filesToUpload = getFilePaths()
  console.log('filesToUpload', filesToUpload)

  try {
    const result = await uploadKnowledgeToAgent(agentId, filesToUpload);

    // Process results
    result.data.forEach(file => {
      console.log(`\n\n--------------------------------`)
      console.log(`File: ${file.filename}`);
      console.log(`ID: ${file.id}`);
      console.log(`Size: ${file.size} bytes`);
      console.log(`Uploaded at: ${new Date(file.uploadedAt).toLocaleString()}`);
      console.log(`Preview: ${file.preview}`);
      console.log(`--------------------------------\n\n`)

    });
  } catch (error) {
    console.error('Failed to upload knowledge:', error);
  }
}

main();
