**3. UTXO Management**

* `getUtxos(bchAddress?)`: Retrieves all UTXOs (BCH and SLP) for the wallet's address or a specified address. The wallet instance must be initialized first to populate the internal `utxoStore`.
* `utxoIsValid(utxo)`: Checks if a specific UTXO (given as `{ txid: '...', vout: 0 }`) is still unspent and valid on the network.
* `optimize()`: This powerful function consolidates UTXOs in your wallet. Having many small UTXOs can slow down operations (as each might require network checks). Optimization sends your BCH and tokens back to yourself in fewer, larger UTXOs, improving performance and user experience.

```javascript
const BchWallet = require('minimal-slp-wallet');

async function manageUtxos(mnemonic) {
  const bchWallet = new BchWallet(mnemonic);
  await bchWallet.walletInfoPromise;

  try {
    await bchWallet.initialize();

    // Get UTXOs
    const utxos = await bchWallet.getUtxos(); // Gets UTXOs for the wallet's address
    console.log(`Wallet has ${utxos.bchUtxos.length} BCH UTXOs.`);
    console.log(`Wallet has ${utxos.slpUtxos.type1.tokens.length} Type1 Token UTXOs.`);
    // console.log(JSON.stringify(utxos, null, 2)); // View all UTXOs

    // Validate a UTXO (Example)
    if (utxos.bchUtxos.length > 0) {
        const utxoToValidate = {
            txid: utxos.bchUtxos[0].tx_hash,
            vout: utxos.bchUtxos[0].tx_pos
        };
        const isValid = await bchWallet.utxoIsValid(utxoToValidate);
        console.log(`Is UTXO ${utxoToValidate.txid}:${utxoToValidate.vout} valid? ${isValid}`);
    }

    // Optimize Wallet UTXOs
    console.log("\nOptimizing wallet UTXOs...");
    // Set dryRun: true to see what *would* happen without broadcasting transactions
    const optimizationResult = await bchWallet.optimize({ dryRun: false });
    console.log("Optimization attempt result:", optimizationResult);
    // Note: Optimization broadcasts transactions and costs fees.
    // After optimizing, you might need to initialize() again to see the changes.


  } catch (err) {
    console.error("Error managing UTXOs:", err);
  }
}

// Replace with your mnemonic
const myMnemonic = 'essence appear intact casino neck scatter search post cube fit door margin';
manageUtxos(myMnemonic);
```
