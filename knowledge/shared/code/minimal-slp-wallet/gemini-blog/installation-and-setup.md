### Post 2: Installation and Setup

Now that you know what `minimal-slp-wallet` offers, let's get it set up in your project.

**Installation**

You can use the library in both browser-based projects and Node.js applications.

* **Browser:**
    Include the library via a script tag in your HTML:
    ```html
    <script src="https://unpkg.com/minimal-slp-wallet"></script>
    ```
    This makes the library available under the global `SlpWallet` object.

* **Node.js:**
    Install it using npm:
    ```bash
    npm install minimal-slp-wallet --save
    ```
    Then, require or import it in your code:
    ```javascript
    // CommonJS
    const BchWallet = require('minimal-slp-wallet');

    // ESM
    // import BchWallet from 'minimal-slp-wallet';
    ```

**Instantiation and Initialization**

To use the library, you first need to create an instance of the `MinimalBCHWallet` class (or `SlpWallet` if using the browser version). The constructor accepts an optional mnemonic or WIF key and an options object.

```javascript
// Import the library (Node.js example)
const BchWallet = require('minimal-slp-wallet');

// --- Basic Instantiation (Creates a NEW wallet) ---
const bchWallet = new BchWallet();

// --- Instantiation with Options ---

// Option 1: Using Web 2 REST API (e.g., FullStack.cash)
const walletWithOptionsRest = new BchWallet(undefined, { // 'undefined' creates a new wallet
  interface: 'rest-api',
  restURL: 'https://api.fullstack.cash/v5/' // Example API endpoint
});

// Option 2: Using Web 3 Consumer API (e.g., free-bch.fullstack.cash or local consumer)
const walletWithOptionsWeb3 = new BchWallet(undefined, {
  interface: 'consumer-api',
  restURL: 'https://free-bch.fullstack.cash' // Example public consumer endpoint
  // Or connect to your own instance: restURL: 'http://localhost:5005'
});

// Option 3: Using an existing mnemonic or WIF
const existingMnemonic = 'minor bench until split suffer shine series bag avoid cruel orient aunt';
const walletFromMnemonic = new BchWallet(existingMnemonic);

const existingWif = 'L3BUek8oq1iijZTkfdRYo8RDxEe3PpB8MyJnh2FSGWAoCjAffQCp';
const walletFromWif = new BchWallet(existingWif);
```

**Important Initialization Steps**

After creating an instance, two asynchronous operations need to complete:

1.  **`walletInfoPromise`:** This promise resolves almost instantly once the basic wallet information (keys, address) is generated or derived. You *must* await this before accessing `walletInfo`.
2.  **`initialize()`:** This method connects to the network (using the specified interface) to fetch the wallet's UTXOs, balance, and token information. It's essential for wallets with existing history but can be skipped for brand new, empty wallets.

```javascript
async function setupWallet() {
  const bchWallet = new BchWallet(undefined, { // Using default REST API
      interface: 'rest-api'
  });

  // 1. Wait for basic wallet info to be generated
  await bchWallet.walletInfoPromise;
  console.log("Wallet Info Ready:", bchWallet.walletInfo.cashAddress);

  // 2. Initialize network state (balances, UTXOs, tokens)
  // This step is crucial for wallets that might have funds or history.
  try {
    await bchWallet.initialize();
    console.log("Wallet Initialized Successfully!");
  } catch (err) {
    console.error("Initialization failed:", err);
    // Handle cases where the wallet is new or network fails
  }

  // Now the wallet instance is fully ready to use!
  // Example: Get balance (requires initialization)
  try {
     const balance = await bchWallet.getBalance();
     console.log(`Balance: ${balance} satoshis`);
  } catch(initErr) {
     console.error("Could not get balance. Was the wallet initialized?", initErr);
  }
}

setupWallet();
```

With installation and initialization covered, we'll dive into creating and managing wallets in the next post.
