**Sending BCH**

To send BCH, you use the `send()` method. It takes an array of output objects, where each object specifies a recipient address and the amount in satoshis (1 BCH = 100,000,000 satoshis).

```javascript
const BchWallet = require('minimal-slp-wallet');

async function sendBchTransaction(mnemonic) {
  const SATS_TO_SEND = 1000; // Minimum is dust limit (currently 546 sats) + fee
  const RECIPIENT_ADDRESS = 'bitcoincash:qp2rmj8heytjrksxm2xrjs0hncnvl08xwgkweawu9h'; // Replace

  const bchWallet = new BchWallet(mnemonic);
  await bchWallet.walletInfoPromise;

  try {
    await bchWallet.initialize(); // Need UTXOs to send

    const balance = await bchWallet.getBalance();
    console.log(`Current balance: ${balance} satoshis`);

    if (balance < SATS_TO_SEND + 500) { // Rough check for fee
        console.log("Insufficient balance to send.");
        return;
    }

    // Define the output(s)
    const outputs = [{
      address: RECIPIENT_ADDRESS,
      amountSat: SATS_TO_SEND
    }];

    // You can send to multiple addresses in one transaction
    // outputs.push({
    //   address: 'bitcoincash:another_address...',
    //   amountSat: 2000
    // });

    console.log(`Sending ${SATS_TO_SEND} satoshis to ${RECIPIENT_ADDRESS}...`);

    // Perform the send operation
    const txid = await bchWallet.send(outputs);

    console.log(`Success! BCH sent.`);
    console.log(`Transaction ID: ${txid}`);
    console.log(`View on explorer: https://explorer.bitcoin.com/bch/tx/${txid}`);

  } catch (err) {
    console.error("Error sending BCH:", err);
    // Handle specific errors like insufficient funds
    if (err.message && err.message.includes('Insufficient balance')) {
        console.error("Not enough BCH to cover the amount and transaction fee.");
    }
  }
}

// Replace with your actual mnemonic
const myMnemonic = 'essence appear intact casino neck scatter search post cube fit door margin';
sendBchTransaction(myMnemonic);
```

**Key Points for Sending:**

* **Fees:** The library automatically calculates and includes the necessary transaction fee (defaulting to ~1 satoshi per byte). You can customize this via the `fee` option in the constructor.
* **UTXO Selection:** It automatically selects the required UTXOs from your wallet to cover the amount and fee. It prioritizes using smaller UTXOs first to help consolidate them.
* **Change:** Any remaining BCH after the send amount and fee are deducted is automatically sent back to your wallet address as a change output.
* **Donation:** By default, a small 2000 satoshi donation is included in each transaction to support the Permissionless Software Foundation (PSF), the creators of `bch-js` which this library relies on.
