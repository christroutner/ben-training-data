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
    console.log('response.data', response.data)
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
  const agentId = '41126fc0-3289-005d-8621-9d28b38e5e36';
  const filesToUpload = [
    path.join(__dirname, '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch03_bitcoin-core.md'),
    path.join(__dirname, '../knowledge/shared/websites/master-bitcoin-3rd-edition/ch04_keys.md')
  ];

  try {
    const result = await uploadKnowledgeToAgent(agentId, filesToUpload);
    
    // Process results
    result.data.forEach(file => {
      console.log(`\nFile: ${file.filename}`);
      console.log(`ID: ${file.id}`);
      console.log(`Size: ${file.size} bytes`);
      console.log(`Preview: ${file.preview}`);
      console.log(`Uploaded at: ${new Date(file.uploadedAt).toLocaleString()}`);
    });
  } catch (error) {
    console.error('Failed to upload knowledge:', error);
  }
}

main();