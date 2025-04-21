**Receiving BCH**

Receiving BCH is passive. You simply need to provide your `bchWallet.walletInfo.cashAddress` (or `legacyAddress` or `slpAddress`) to the sender. When they send funds, the transaction will appear on the blockchain. To see the updated balance in your application, you'll need to call `bchWallet.initialize()` again to refresh the UTXO and balance information from the network.

**Sending All BCH**

The library provides a convenience method `sendAll()` to sweep the entire BCH balance of the wallet to a single address, minus the transaction fee.

```javascript
const BchWallet = require('minimal-slp-wallet');

async function sweepWallet(mnemonic, destinationAddress) {
    const bchWallet = new BchWallet(mnemonic);
    await bchWallet.walletInfoPromise;

    try {
        await bchWallet.initialize();
        const balance = await bchWallet.getBalance();
        console.log(`Starting balance: ${balance} satoshis`);

        if (balance <= 546) { // Need more than dust to cover fee
            console.log("Balance too low to sweep.");
            return;
        }

        console.log(`Sweeping all funds to ${destinationAddress}...`);
        const txid = await bchWallet.sendAll(destinationAddress);

        console.log(`Success! Wallet swept.`);
        console.log(`Transaction ID: ${txid}`);
        console.log(`View on explorer: https://explorer.bitcoin.com/bch/tx/${txid}`);

    } catch (err) {
        console.error("Error sweeping wallet:", err);
    }
}

// Replace with your mnemonic and the address to send funds to
const myMnemonic = 'essence appear intact casino neck scatter search post cube fit door margin';
const sweepToAddress = 'bitcoincash:q...'; // Your destination address
sweepWallet(myMnemonic, sweepToAddress);
```
