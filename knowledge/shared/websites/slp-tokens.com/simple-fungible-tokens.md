---
sidebar_position: 1
slug: /simple-fungible-tokens
---

# Simple Fungible Tokens

If you can [install node.js on your computer](https://www.youtube.com/watch?v=7pbQ4ZKPBiU), you can clone the psf-slp-wallet command-line interface (CLI). This is the most comprehensive software for creating and managing tokens. You can create all types (Type 1, 65, 128) of SLP tokens, can mint them, can attach data to them, and can manage multiple wallets.

- [psf-slp-wallet GitHub Repository](https://github.com/Permissionless-Software-Foundation/psf-slp-wallet)

<iframe width="639" height="359" src="https://www.youtube.com/embed/gjgeUIWekoA" title="The Easiest Way to Make NFTs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>

---

# Getting Started with PSF SLP Wallet: Create Your First Fungible Token

If you're looking to create and manage SLP (Simple Ledger Protocol) tokens from the command line, the [PSF SLP Wallet](https://github.com/Permissionless-Software-Foundation/psf-slp-wallet) is a powerful and easy-to-use tool. In this guide, we’ll walk through installing the wallet, creating a fungible token, and sending it to a token-aware wallet—all from scratch on a brand new Ubuntu 20 system. The process also works on Windows and macOS.


## Step 1: Set Up Your Environment

You'll need a terminal environment to run the wallet. This could be:

- Ubuntu (or another Linux distro)
- Windows PowerShell
- macOS Terminal
- VS Code terminal on any platform

Before you begin:

- **Install Node.js** (v20.9 used in the video, but newer versions should work)
- **Install npm** (Node Package Manager)

To verify installation:

```bash
node -v
npm -v
```

---

## Step 2: Clone the Wallet Repository

Clone the open-source PSF SLP Wallet from GitHub:

```bash
git clone https://github.com/Permissionless-Software-Foundation/psf-slp-wallet
cd psf-slp-wallet
npm install
```

Once installed, you can check available commands:

```bash
node psf-slp-wallet.js --help
```

---

## Step 3: Create a Wallet

Create a new wallet using:

```bash
node psf-slp-wallet.js wallet-create -n wallet1 -d "Test Wallet 1"
```

You can list all wallets:

```bash
node psf-slp-wallet.js wallet-list
```

And view the addresses:

```bash
node psf-slp-wallet.js wallet-addrs -n wallet1
```

Take note of the **Bitcoin Cash (bitcoincash:)** address. You’ll need it to fund the wallet.

---

## Step 4: Fund the Wallet

To create tokens, your wallet needs a small amount of Bitcoin Cash (BCH)—a few cents is sufficient.

One quick way to fund the wallet is by using the [web wallet](https://wallet.psfoundation.info), which will generate a BCH wallet you can use to send funds. Transfer ~$0.10 worth of BCH to your new wallet's address.

After funding, check your balance:

```bash
node psf-slp-wallet.js wallet-balance -n wallet1
```

---

## Step 5: Create a Fungible Token

Use this command to create a basic fungible token:

```bash
node psf-slp-wallet.js token-create-fungible \
  -n wallet1 \
  -m test1 \
  -t test1 \
  -d 2 \
  -q 100
```

This creates 100 tokens with 2 decimal places, allowing fractional amounts like `1.00`, `0.50`, or `0.01`.

You can confirm creation by viewing the blockchain record (a link will be printed in the console) or checking your balance again:

```bash
node psf-slp-wallet.js wallet-balance -n wallet1
```

Take note of the **Token ID** from your balance output—it's required to send the token.

---

## Step 6: Send Tokens to Another Wallet

To send tokens, first get a **Simple Ledger address** from a token-aware wallet like the [PSF Web Wallet](https://wallet.psfoundation.info). Toggle to “SLP mode” to see the correct address.

Then run:

```bash
node psf-slp-wallet.js send-tokens \
  -n wallet1 \
  -t [your-token-id] \
  -q 100 \
  -a [receiver simpledger: address]
```

Your tokens should now appear in the recipient's wallet. Always use **token-aware wallets** to avoid accidentally burning tokens.

---

## What’s Next?

This walkthrough showed how to:

- Install the [PSF SLP Wallet](https://github.com/Permissionless-Software-Foundation/psf-slp-wallet) 
- Create a fungible token  
- Send it to another wallet

Future tutorials will cover:

- Attaching **mutable** and **immutable data**
- Adding **token icons**
- Creating **NFTs and NFT groups**

Stay tuned for more advanced features!



