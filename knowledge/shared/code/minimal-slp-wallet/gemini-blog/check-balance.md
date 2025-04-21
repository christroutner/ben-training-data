**Checking Your Balance**

Before sending, you usually want to check your balance. Ensure your wallet instance is initialized first (`await bchWallet.initialize();`).

```javascript
const BchWallet = require('minimal-slp-wallet');

async function checkBalance(mnemonic) {
  const bchWallet = new BchWallet(mnemonic); // Use your mnemonic or WIF
  await bchWallet.walletInfoPromise;

  try {
    // Initialization is required to fetch the current balance
    await bchWallet.initialize();
    console.log("Wallet Initialized.");

    const balanceSatoshis = await bchWallet.getBalance();
    console.log(`Wallet Balance: ${balanceSatoshis} satoshis`);
    console.log(`Which is ${balanceSatoshis / 100000000} BCH`);

    // You can also check the balance of any BCH address
    const otherAddress = 'bitcoincash:qp...'; // Replace with a valid address
    // const otherBalance = await bchWallet.getBalance({ bchAddress: otherAddress });
    // console.log(`Balance of ${otherAddress}: ${otherBalance} satoshis`);

  } catch (err) {
    console.error("Error checking balance:", err);
  }
}

// Replace with your actual mnemonic
const myMnemonic = 'essence appear intact casino neck scatter search post cube fit door margin';
checkBalance(myMnemonic);
```
