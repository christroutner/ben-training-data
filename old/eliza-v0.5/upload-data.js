/*
  Upload data to the Eliza agent.

  This is an older file that was used to upload RAG knowledge via a REST API 
  built into the ct-unstable-v0.1.5-eliza2 branch of the Eliza repository.

  The v1.0.0 version of ElizaOS uses a different method to upload RAG data:
  https://eliza.how/docs/core/knowledge
*/

// Global npm libraries
import axios from 'axios'
import { readFileSync } from 'fs'
import * as url from 'url'

// Customize these global variables with the custom values for your own Eliza agent.
const agentId = "b850bc30-45f8-0041-a00a-83df46d8555d";
const userId = "ffbb4daf-5149-0902-b675-30e9ab20706f"
const roomId = "06cc2fa6-d02a-09a1-a96d-418f707919e8"
const name = "Chris"
const userName = "christroutner"

const apiUrl = `http://localhost:3000/${agentId}/memorizeDocument`;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const filesToUpload = [
  `${__dirname.toString()}data/code/bch-js/bch-js.md`,
  `${__dirname.toString()}data/websites/master-bitcoin-3rd-edition/ch03_bitcoin-core.adoc`,
  `${__dirname.toString()}data/websites/master-bitcoin-3rd-edition/ch04_keys.adoc`,
  `${__dirname.toString()}data/websites/master-bitcoin-3rd-edition/ch05_wallets.adoc`,
  `${__dirname.toString()}data/websites/master-bitcoin-3rd-edition/ch06_transactions.adoc`,
  `${__dirname.toString()}data/websites/master-bitcoin-3rd-edition/ch07_authorization-authentication.adoc`,
  `${__dirname.toString()}data/websites/master-bitcoin-3rd-edition/ch08_signatures.adoc`,
  `${__dirname.toString()}data/websites/master-bitcoin-3rd-edition/ch09_fees.adoc`,
  `${__dirname.toString()}data/websites/master-bitcoin-3rd-edition/ch10_network.adoc`,
  `${__dirname.toString()}data/websites/master-bitcoin-3rd-edition/ch11_blockchain.adoc`,
  `${__dirname.toString()}data/websites/master-bitcoin-3rd-edition/ch12_mining.adoc`,
  `${__dirname.toString()}data/websites/master-bitcoin-3rd-edition/ch13_security.adoc`,
  `${__dirname.toString()}data/websites/master-bitcoin-3rd-edition/ch14_applications.adoc`,
]

async function start() {
  try {
    
    // Upload each document to the Agent.
    for(let i=0; i < filesToUpload.length; i++) {
      const filePath = filesToUpload[i]

      try {
        
        const text = readFileSync(filePath, 'utf8')
        
        await axios.post(apiUrl, {
          userId,
          roomId,
          name,
          userName,
          text
        });
      } catch(err) {
        console.log(`Could not upload ${filePath}. Error: ${err.message}`)
      }
    }
    
  } catch (error) {
    console.error(error);
  }
}
start()
