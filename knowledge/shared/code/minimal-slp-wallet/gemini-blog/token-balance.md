**Checking the Balance of a Specific Token**

If you only need the balance for one specific token ID, use `getTokenBalance()`.

```javascript
const BchWallet = require('minimal-slp-wallet');

async function checkSpecificTokenBalance(mnemonic, tokenIdToCheck) {
  const bchWallet = new BchWallet(mnemonic);
  await bchWallet.walletInfoPromise;

  try {
    await bchWallet.initialize(); // Required

    console.log(`Checking balance for Token ID: ${tokenIdToCheck}`);
    console.log(`On SLP Address: ${bchWallet.walletInfo.slpAddress}`);

    // Pass an object with tokenId (required) and optionally slpAddress
    const tokenBalance = await bchWallet.getTokenBalance({ tokenId: tokenIdToCheck });

    console.log(`Balance for token ${tokenIdToCheck}: ${tokenBalance}`);

    // Check balance for another address
    // const otherSlpAddress = 'simpleledger:q...';
    // const otherTokenBalance = await bchWallet.getTokenBalance({
    //     tokenId: tokenIdToCheck,
    //     slpAddress: otherSlpAddress
    // });
    // console.log(`Balance for token ${tokenIdToCheck} on ${otherSlpAddress}: ${otherTokenBalance}`);


  } catch (err) {
    console.error("Error checking token balance:", err);
  }
}

// Replace with your mnemonic and the Token ID you want to check
const myMnemonic = 'essence appear intact casino neck scatter search post cube fit door margin';
const specificTokenId = 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2'; // Example PSF token
checkSpecificTokenBalance(myMnemonic, specificTokenId);
```
