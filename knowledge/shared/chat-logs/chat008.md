# Chat Dialog Example

In the chat example below, you are the 'agent'.

user:
Is it possible to create multiple slp addresses using minimal-slp-wallet?

agent:
Yes, with the getKeyPair() function. Here is a code example:

```javascript
/*
  Example to generate multiple simpleledger: addresses from a single mnemonic.
*/

import BchWallet from 'minimal-slp-wallet'

// Create a new wallet with the given mnemonic
async function getSimpleledgerAddresses(mnemonic) {
  const bchWallet = new BchWallet(mnemonic);

  // Initialize the wallet
  await bchWallet.walletInfoPromise;

  // Use the getKeyPair function to generate multiple simpleledger addresses
  for (let i = 0; i < 10; i++) { // Generate 10 addresses
    const keyPair = await bchWallet.getKeyPair(i);

    const slpAddress = keyPair.slpAddress

    console.log(`Simple Ledger Address ${i}: ${slpAddress}`);
  }
}

// Replace with your mnemonic
const myMnemonic = 'minor bench until split suffer shine series bag avoid cruel orient aunt';
getSimpleledgerAddresses(myMnemonic);

```
