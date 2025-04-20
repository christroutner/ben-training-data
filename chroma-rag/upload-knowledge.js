/*
  Experimental script for uploading markdown files using the
  POST /:agentId/memories/upload-knowledge endpoint.
*/

// Public npm libraries
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Constants
const CHROMA_URL = 'http://localhost:3000/upload'


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
  // '../knowledge/shared/code/bch-js/llm'
]

// Consume the directoriesToIngest array and return an array of file paths
// representing all the files in all the directories.
function getFilePaths() {
  try {
    const filePaths = []

    // Loop through each directory.
    directoriesToIngest.forEach(directory => {
      const directoryPath = path.join(__dirname, directory)
      const files = fs.readdirSync(directoryPath)

      // Loop through each file in the directory.
      files.forEach(file => {
        const filePath = path.join(directoryPath, file)

        // Generate a file path for each file.
        filePaths.push(filePath)
      })
    })

    return filePaths

  } catch(err) {
    console.error('Error in getFilePaths()')
    throw err
  }
}

async function uploadKnowledgeToAgent(inObj = {}) {
  try {

    const {filesPathsForUpload} = inObj

    // Loop through each file path.
    for(let i=0; i < filesPathsForUpload.length; i++) {
    // for(let i=0; i < 3; i++) {
      const thisFilePath = filesPathsForUpload[i]

      const content = fs.readFileSync(thisFilePath, 'utf8')
      // console.log('content: ', content)

      await axios.post(CHROMA_URL, { content })
      // const data = response.data
      // console.log('data: ', data)
    }

    // Handle successful response
    console.log('Upload successful!')

    return true;
  } catch (error) {
    // Handle errors
    console.error('Upload failed:', error.response?.data || error.message);
    throw error;
  }
}

// Primary function that is executed when the script is run.
async function main() {
  // const agentId = 'b850bc30-45f8-0041-a00a-83df46d8555d';
  // const filesToUpload = [
  //   path.join(__dirname, '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch03_bitcoin-core.md'),
  //   path.join(__dirname, '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch04_keys.md')
  // ];

  const filesPathsForUpload = getFilePaths()
  console.log('filesPathsForUpload', filesPathsForUpload)

  try {
    const result = await uploadKnowledgeToAgent({filesPathsForUpload});
    console.log('result: ', result)

    // Process results
    // result.data.forEach(file => {
    //   console.log(`\n\n--------------------------------`)
    //   console.log(`File: ${file.filename}`);
    //   console.log(`ID: ${file.id}`);
    //   console.log(`Size: ${file.size} bytes`);
    //   console.log(`Uploaded at: ${new Date(file.uploadedAt).toLocaleString()}`);
    //   console.log(`Preview: ${file.preview}`);
    //   console.log(`--------------------------------\n\n`)

    // });
  } catch (error) {
    console.error('Failed to upload knowledge:', error);
  }
}

main();
