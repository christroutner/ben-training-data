### Creating and Managing Wallets

This post focuses on creating new wallets, importing existing ones, and securely managing your wallet keys using `minimal-slp-wallet`.

**Creating a New Wallet**

Creating a new wallet is straightforward. Simply instantiate the `BchWallet` class without providing a mnemonic or WIF key.

```javascript
const BchWallet = require('minimal-slp-wallet');

async function createNewWallet() {
  const bchWallet = new BchWallet();

  // Wait for the wallet details to be generated
  await bchWallet.walletInfoPromise;

  console.log("New Wallet Created!");
  console.log("Mnemonic:", bchWallet.walletInfo.mnemonic); // Keep this safe!
  console.log("Cash Address:", bchWallet.walletInfo.cashAddress);
  console.log("SLP Address:", bchWallet.walletInfo.slpAddress);
  console.log("Private Key (WIF):", bchWallet.walletInfo.privateKey); // Keep this safe!
  console.log("Derivation Path:", bchWallet.walletInfo.hdPath); // Default: m/44'/245'/0'/0/0
}

createNewWallet();
```
The `walletInfo` object holds all the critical details. **Remember to securely back up the mnemonic phrase!**

**Importing Existing Wallets**

You can initialize the wallet from an existing 12-word mnemonic phrase or a WIF (Wallet Import Format) private key.

* **From Mnemonic:**
    ```javascript
    const BchWallet = require('minimal-slp-wallet');

    async function importFromMnemonic() {
      const mnemonic = 'minor bench until split suffer shine series bag avoid cruel orient aunt'; // Replace with your mnemonic
      const bchWallet = new BchWallet(mnemonic);

      await bchWallet.walletInfoPromise;

      console.log("Wallet Imported from Mnemonic:");
      console.log("Cash Address:", bchWallet.walletInfo.cashAddress);
      console.log("Private Key (WIF):", bchWallet.walletInfo.privateKey);
    }

    importFromMnemonic();
    ```

* **From WIF:** WIF keys typically start with 'K' or 'L'.
    ```javascript
    const BchWallet = require('minimal-slp-wallet');

    async function importFromWif() {
      const wif = 'L3BUek8oq1iijZTkfdRYo8RDxEe3PpB8MyJnh2FSGWAoCjAffQCp'; // Replace with your WIF
      const bchWallet = new BchWallet(wif);

      await bchWallet.walletInfoPromise;

      console.log("Wallet Imported from WIF:");
      console.log("Cash Address:", bchWallet.walletInfo.cashAddress);
      console.log("Private Key (WIF):", bchWallet.walletInfo.privateKey); // Same as input WIF
      console.log("Mnemonic:", bchWallet.walletInfo.mnemonic); // Will be null when importing from WIF
    }

    importFromWif();
    ```

**Changing the Derivation Path**

By default, the library uses the standard SLP path `m/44'/245'/0'/0/0`. You can specify a different HD (Hierarchical Deterministic) path during instantiation if needed.

```javascript
const BchWallet = require('minimal-slp-wallet');

async function useDifferentPath() {
    const mnemonic = 'minor bench until split suffer shine series bag avoid cruel orient aunt';
    const customPath = "m/44'/245'/0'/1'"; // Example: First derived address on second account

    const bchWallet = new BchWallet(mnemonic, {
        hdPath: customPath
    });

    await bchWallet.walletInfoPromise;

    console.log(`Wallet using path ${bchWallet.walletInfo.hdPath}:`);
    console.log("Cash Address:", bchWallet.walletInfo.cashAddress);
}

useDifferentPath();
```

**Encrypting and Decrypting Mnemonics**

For added security, especially when storing mnemonics (e.g., in browser `localStorage`), you can encrypt them with a password.

```javascript
const BchWallet = require('minimal-slp-wallet');

async function manageEncryptedWallet() {
  const password = 'yourStrongPassword!'; // Use a strong, unique password

  // 1. Create a new wallet with encryption enabled
  const bchWalletEncrypt = new BchWallet(null, { // 'null' or 'undefined' creates a new wallet
    password: password
  });
  await bchWalletEncrypt.walletInfoPromise;

  console.log("Original Mnemonic:", bchWalletEncrypt.walletInfo.mnemonic);
  console.log("Encrypted Mnemonic:", bchWalletEncrypt.walletInfo.mnemonicEncrypted); // Store this encrypted version

  // --- Later, when retrieving the wallet ---

  // 2. Instantiate the wallet using the encrypted mnemonic and password
  const encryptedMnemonicFromStorage = bchWalletEncrypt.walletInfo.mnemonicEncrypted; // Retrieve this
  const bchWalletDecrypt = new BchWallet(encryptedMnemonicFromStorage, {
    password: password
  });
  await bchWalletDecrypt.walletInfoPromise;

  console.log("Decrypted Mnemonic:", bchWalletDecrypt.walletInfo.mnemonic);
  console.log("Cash Address:", bchWalletDecrypt.walletInfo.cashAddress);

  // Trying with the wrong password will throw an error during instantiation
  try {
      const wrongPasswordWallet = new BchWallet(encryptedMnemonicFromStorage, {
          password: 'wrongPassword'
      });
      await wrongPasswordWallet.walletInfoPromise;
  } catch (err) {
      console.error("Decryption failed (expected):", err.message); // Should say 'Wrong password'
  }
}

manageEncryptedWallet();
```
**Security Note:** Never send unencrypted private keys or mnemonics to your server. Manage keys client-side and use encryption when storing them.
