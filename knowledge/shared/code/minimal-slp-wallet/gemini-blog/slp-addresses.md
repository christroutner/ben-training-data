**Understanding SLP Addresses**

While SLP tokens exist on the Bitcoin Cash blockchain, they use a specific address format, typically starting with `simpleledger:`. The library automatically generates the corresponding SLP address for your wallet (`walletInfo.slpAddress`). You'll often use this address when dealing with tokens.

**Listing Tokens in Your Wallet**

To see which SLP tokens your wallet holds and their quantities, use the `listTokens()` method. This requires the wallet to be initialized.

```javascript
const BchWallet = require('minimal-slp-wallet');

async function listMyTokens(mnemonic) {
  const bchWallet = new BchWallet(mnemonic);
  await bchWallet.walletInfoPromise;
  console.log(`Checking tokens for SLP address: ${bchWallet.walletInfo.slpAddress}`);

  try {
    await bchWallet.initialize(); // Fetches UTXOs, including token UTXOs

    const tokens = await bchWallet.listTokens();

    if (tokens.length === 0) {
      console.log("No SLP tokens found in this wallet.");
    } else {
      console.log("SLP Tokens Found:");
      console.log(JSON.stringify(tokens, null, 2));
    }

    // You can also list tokens for any SLP address
    const otherSlpAddress = 'simpleledger:q...'; // Replace if needed
    // const otherTokens = await bchWallet.listTokens(otherSlpAddress);
    // console.log(`\nTokens for ${otherSlpAddress}:`);
    // console.log(JSON.stringify(otherTokens, null, 2));

  } catch (err) {
    console.error("Error listing tokens:", err);
  }
}

// Replace with your mnemonic
const myMnemonic = 'essence appear intact casino neck scatter search post cube fit door margin';
listMyTokens(myMnemonic);
```
The output is an array of objects, each detailing a token type held by the address, including its `tokenId`, `ticker`, `name`, `decimals`, and total `qty`.
