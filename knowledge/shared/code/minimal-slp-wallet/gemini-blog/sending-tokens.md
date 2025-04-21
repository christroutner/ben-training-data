**Sending SLP Tokens**

Sending tokens is similar to sending BCH, but uses the `sendTokens()` method. It requires an output object specifying the recipient's SLP address, the `tokenId`, and the `qty` to send.

```javascript
const BchWallet = require('minimal-slp-wallet');

async function sendTokenTransaction(mnemonic) {
  // --- Customize These ---
  const TOKEN_ID_TO_SEND = '82e3d97b3cd033e60ffa755450b9075cf44fe1b2f6d5dc13657d8263e716b6a5'; // Replace with actual token ID
  const QTY_TO_SEND = 1; // Amount of the token to send
  const RECIPIENT_SLP_ADDR = 'simpleledger:qpeq7xx5x3a2jfa0x0w8cjqp4v9cm842vgsjqwzvfk'; // Replace
  // ---

  const bchWallet = new BchWallet(mnemonic);
  await bchWallet.walletInfoPromise;

  try {
    await bchWallet.initialize(); // Need UTXOs (both BCH and Token)

    // Optional: Check BCH balance first (needed for transaction fee)
    const bchBalance = await bchWallet.getBalance();
    if (bchBalance < 1000) { // Rough fee check
      console.log("Insufficient BCH balance for transaction fee.");
      return;
    }

    // Optional: Check token balance
    const tokenBalance = await bchWallet.getTokenBalance({ tokenId: TOKEN_ID_TO_SEND });
    if (tokenBalance < QTY_TO_SEND) {
      console.log(`Insufficient token balance. Have ${tokenBalance}, need ${QTY_TO_SEND}`);
      return;
    }

    // Define the token output
    // Note: Currently only supports sending one token type to one address per tx
    const tokenOutput = {
      address: RECIPIENT_SLP_ADDR,
      tokenId: TOKEN_ID_TO_SEND,
      qty: QTY_TO_SEND
    };

    console.log(`Sending ${QTY_TO_SEND} of token ${TOKEN_ID_TO_SEND} to ${RECIPIENT_SLP_ADDR}...`);

    // Send the token
    // You can pass a fee rate (sats/byte) as the second arg, defaults to ~1.0
    const txid = await bchWallet.sendTokens(tokenOutput /*, optionalFeeRate */);

    console.log(`Success! Token sent.`);
    console.log(`Transaction ID: ${txid}`);
    console.log(`View on explorer: https://simpleledger.info/tx/${txid}`); // Use SLP explorer

  } catch (err) {
    console.error("Error sending tokens:", err);
    // Handle specific errors like insufficient funds (BCH or token)
  }
}

// Replace with your mnemonic
const myMnemonic = 'essence appear intact casino neck scatter search post cube fit door margin';
sendTokenTransaction(myMnemonic);
```

**Important Considerations for Sending Tokens:**

* **BCH Required:** Sending SLP tokens still requires a small amount of BCH in the sending wallet to pay for the transaction fee.
* **UTXOs:** The process uses both specific Token UTXOs (matching the `tokenId`) and regular BCH UTXOs (for the fee).
* **Dust Outputs:** Token transactions involve sending tiny "dust" amounts (546 satoshis) of BCH to the recipient address (to carry the token) and potentially back to the sender as token change.
* **Single Output:** The current implementation primarily supports sending one token type to one recipient address per transaction.
