**Burning Tokens**

If you want to destroy tokens, the library offers methods for that:

* `burnTokens(qty, tokenId)`: Burns a *specific quantity* of a token.
* `burnAll(tokenId)`: Burns *all* tokens of a specific ID held by the wallet.

```javascript
const BchWallet = require('minimal-slp-wallet');

async function burnSomeTokens(mnemonic, tokenIdToBurn, qtyToBurn) {
    const bchWallet = new BchWallet(mnemonic);
    await bchWallet.walletInfoPromise;

    try {
        await bchWallet.initialize();

        // Check balances if needed...

        console.log(`Attempting to burn ${qtyToBurn} of token ${tokenIdToBurn}...`);

        // Burn the specified quantity
        const txid = await bchWallet.burnTokens(qtyToBurn, tokenIdToBurn);

        console.log(`Success! ${qtyToBurn} tokens burned.`);
        console.log(`Transaction ID: ${txid}`);

    } catch (err) {
        console.error("Error burning tokens:", err);
    }
}

async function burnAllMyTokens(mnemonic, tokenIdToBurn) {
    const bchWallet = new BchWallet(mnemonic);
    await bchWallet.walletInfoPromise;

    try {
        await bchWallet.initialize();

        // Check balances if needed...

        console.log(`Attempting to burn ALL of token ${tokenIdToBurn}...`);

        // Burn all tokens of this ID
        const txid = await bchWallet.burnAll(tokenIdToBurn);

        console.log(`Success! All tokens of ID ${tokenIdToBurn} burned.`);
        console.log(`Transaction ID: ${txid}`);

    } catch (err) {
        console.error("Error burning all tokens:", err);
    }
}

// Replace with your mnemonic and token details
const myMnemonic = 'essence appear intact casino neck scatter search post cube fit door margin';
const burnTokenId = '6201f3efe486c577433622817b99645e1d473cd3882378f9a0efc128ab839a82';
const burnQty = 0.1;

// Choose one to run:
// burnSomeTokens(myMnemonic, burnTokenId, burnQty);
// burnAllMyTokens(myMnemonic, burnTokenId);
```
