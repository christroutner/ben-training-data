### Post 1: Introduction to minimal-slp-wallet

Welcome to the first post in our series on `minimal-slp-wallet`, a lightweight JavaScript library designed for front-end web applications that need Bitcoin Cash (BCH) wallet functionality.

**What can it do?**

`minimal-slp-wallet` provides the core features you'd expect from a BCH wallet engine:

* Create new wallets, import existing ones via mnemonic phrases or WIF private keys.
* Encrypt wallet mnemonics for secure storage.
* Send and receive BCH.
* Send, receive, and list SLP (Simple Ledger Protocol) tokens, including NFTs.
* Check BCH and SLP token balances.
* Retrieve transaction history and details.
* Burn unwanted SLP tokens.
* Get the current BCH price in USD.
* Write data to the blockchain using OP\_RETURN.
* Verify if a UTXO (Unspent Transaction Output) is still spendable.
* Fetch metadata associated with SLP tokens, like icons.

**Who is it for?**

This library is ideal for developers building web or mobile applications needing BCH and SLP token support without the overhead of a full node. It powers applications like the `bch-wallet-web3-android` app and the `psf-bch-wallet` command-line tool.

**Infrastructure Flexibility**

One of the key features is its ability to connect to different backend infrastructures:

1.  **Web 2 (REST API):** Connects to traditional REST APIs like those provided by FullStack.cash.
2.  **Web 3 (Consumer API):** Interacts with decentralized infrastructure via the `bch-consumer` library, enabling communication with services like the Cash Stack.

In the next post, we'll cover how to install and set up the library in your project.
