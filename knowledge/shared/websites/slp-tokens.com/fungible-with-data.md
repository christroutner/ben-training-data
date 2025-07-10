---
sidebar_position: 2
slug: /fungible-with-data
---

# Fungible Tokens with Data

This page extends the chapter on simple fungible tokens, to create fungible tokens with rich data, including token icons.

<iframe width="639" height="359" src="https://www.youtube.com/embed/v3mr084nZpI" title="The Easiest Way to Make NFTs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>

Creating Simple Ledger Protocol (SLP) tokens with rich, dynamic data can unlock a wide range of use cases, from tracking video game characters to supply chain products. The `psf-slp-wallet` is a command-line interface (CLI) application that allows you to create and manage these SLP tokens. While creating a basic fungible token is straightforward, attaching and managing **mutable data**, such as a token icon, involves a few more steps that empower tokens with significant functionality.

This blog post summarizes the process described in a tutorial video on creating fungible tokens with mutable data using `psf-slp-wallet`.

### Understanding Key Concepts

Before diving into the steps, it's helpful to understand some core concepts related to SLP token data:

*   **Genesis Data**: This is a small amount of data actually written to the blockchain when a token is created. It's fundamental to the token's existence.
*   **Mutable Data**: This refers to data associated with a token that **can change over time**. A common use case for mutable data is adding a **token icon** for visual identification. It also allows for tracking dynamic information, like a character's stats or a product's location.
*   **Immutable Data**: In contrast, immutable data is associated with a token but **cannot be changed** once it's set. This is often used for permanent records, such as initial creator information or design intent.
*   **Mutable Data Address (MDA)**: This is a crucial concept. The MDA is a specific address that **controls the mutable data** for a token. Even if the token itself is sent to someone else, the creator (or anyone holding the private key for the MDA) can retain the ability to edit the token's associated mutable data. This flexibility allows for scenarios like artists enforcing royalty agreements or updating owner information for digital art. The MDA acts like a pointer, and by updating it, you can direct the token to a new version of its mutable data.

### Step-by-Step Guide to Creating a Fungible Token with Rich Data

To create a fungible token with a token icon and other mutable data using `psf-slp-wallet`, follow these detailed steps:

#### 1. Prepare and Fund Your Mutable Data Address (MDA) Wallet

It is considered **best practice** to use a separate wallet specifically for controlling the mutable data of each token, distinct from the wallet that will hold the tokens themselves.

*   **Create a new wallet** for your MDA. For example, you can name it `MDA1`.
    *   Command: `wallet create MDA1`
*   **Get the address** of your newly created MDA wallet.
    *   Command: `wallet addrs`
*   **Fund this MDA wallet** with a small amount of Bitcoin Cash (BCH) to cover transaction fees. Even 10 cents BCH is typically more than enough.

#### 2. Initialize the MDA

This step creates an initial transaction on the blockchain, setting up your MDA.

*   **Command**: `node psf-slp-wallet.js token-mda-tx -n <MDA_Wallet_Name> -a <MDA_Address>`
    *   Example: `node psf-slp-wallet.js token-mda-tx -n MDA1 -a bitcoincash:qr2u4f2dmva6yvf3npkd5lquryp09qk7gs5vxl423h`
*   **Record the transaction ID** of this initialization, as it will be needed later to link your token to the mutable data.

#### 3. Create and Upload Your Token Icon

Your token icon needs to be hosted on a network accessible by the SLP protocol, such as IPFS. The video demonstrates using [explorer.psffpp.com](https://explorer.psffpp.com) to upload and pin files.

*   **Upload your token icon file** (e.g., an image) to the network. This process will provide you with an **IPFS Content ID (CID)** for your file.
*   **Pin the file** to ensure it remains available on the network.
*   Once pinned and accepted by the network, you'll be able to **get a URL** for your token icon. **Record this URL**.

#### 4. Edit and Upload the Mutable Data File

Mutable data is typically stored in a **JSON file**. The video suggests [using templates available on a GitHub gist](https://gist.github.com/christroutner/d7a9b8875925ea656f512f6ba4d0084d) to simplify this process.

*   **Edit the mutable data JSON template**. The most important fields for a token icon are `tokenIcon` and `fullSizedUrl`.
    *   The `tokenIcon` is for a smaller thumbnail, while `fullSizedUrl` is for a larger image. If using the same image for both, populate both fields with the same URL.
    *   You can also include a `about`, specify `mediaType` (e.g., image, video, music), and add any arbitrary user data in the `userData` field.
*   **Save your edited mutable data JSON file**.
*   **Upload this JSON file** to the network (e.g., via [explorer.psffpp.com](https://explorer.psffpp.com)) just like you did with the token icon. This will give you a new **IPFS CID** for your mutable data file.
*   **Pin the mutable data file** and **record its IPFS CID**.

#### 5. Point the MDA to the New Mutable Data

This step links your MDA to the mutable data file you just uploaded.

*   **Command**: `node psf-slp-wallet.js token-update -n <MDA_Wallet_Name> -c ipfs://<Mutable_Data_IPFS_CID>`
    *   Example: `node psf-slp-wallet.js token-update -n MDA1 -c ipfs://bafkreifhtcnmf577q2s5lfr46ax5qf2jnk7oy3azu5x7ceab6xajcccl3u`
*   The `ipfs://` prefix is crucial as it tells the application that the file is on the IPFS network.
*   This command creates a transaction on the blockchain that updates the MDA's pointer to the new mutable data. **Record this transaction ID** as your "first mutable data update".

#### 6. (Optional but Recommended) Edit and Upload the Immutable Data File

While optional, uploading immutable data is good practice for keeping a permanent record of your initial intentions for the token.

*   **Edit an immutable data JSON template**.
    *   You can include a timestamp, `userData`, `jsonLd` (JSON Linked Data).
    *   It's useful to record the MDA and the initialization transaction ID from Step 2, and the first mutable data update transaction ID from Step 5 here.
*   **Save your edited immutable data JSON file**.
*   **Upload this JSON file** to the network and **record its IPFS CID**. You generally won't need the URL for this file directly, as it's often referenced by its CID.

#### 7. Create the Fungible Token

Now you can create the actual SLP token, linking it to the mutable and immutable data you prepared. It's recommended to create the token in a **separate wallet** from your MDA wallet.

*   **Command**: `node psf-slp-wallet.js token-create-fungible -n <Token_Wallet_Name> -m "Token Name" -t Ticker -d <Decimals> -q <Quantity> -u ipfs://<Immutable_Data_IPFS_CID> -h <MDA_Initialization_TxID>`
    *   `-n`: Name of the wallet to hold the tokens.
    *   `-m`: Full name of your token (required).
    *   `-t`: Token ticker (required).
    *   `-d`: Number of decimals for your token (required). Zero decimals make whole tokens that cannot be subdivided.
    *   `-q`: Quantity of tokens to create (required).
    *   `-u`: This flag specifies the **immutable data**. Prefix the IPFS CID of your immutable data file with `ipfs://`.
    *   `-h`: This flag specifies the **hash that connects the token to its mutable data**. Use the **transaction ID from your MDA initialization** (from Step 2) here. This acts as a "breadcrumb trail" that the protocol follows to find the latest mutable data.
    *   Example: `node psf-slp-wallet.js token-create-fungible -n tokens1 -m "M test one" -t MTEST -d 0 -q 1000 -u ipfs://<Immutable_Data_IPFS_CID> -h <MDA_Initialization_TxID>`

#### 8. Verify and Use Your Token

After creation, you can check your token balance in the specified wallet. You can also send tokens to a web wallet, such as [wallet.psfoundation.info](https://wallet.psfoundation.info), to observe them. Due to the decentralized nature of the network, it might take a few minutes for the token icon and other information to fully propagate and display.

### Updating Mutable Data After Token Creation

One of the powerful features of SLP tokens with mutable data is the ability to **update that data even after the token has been created and transferred**. This process is similar to how you initially pointed your MDA to the mutable data.

To update the mutable data (e.g., changing the token icon):

1.  **Create or modify your new token icon**.
2.  **Upload the new token icon** to the network and obtain its new IPFS CID and URL.
3.  **Edit your mutable data JSON file** to reflect the new token icon URL. Remember to save this file.
4.  **Upload the updated mutable data JSON file** to the network, obtaining its new IPFS CID.
5.  **Use the `token-update` command again** to point your MDA to this new mutable data file.
    *   Command: `node psf-slp-wallet.js token-update -n <MDA_Wallet_Name> -c ipfs://<New_Mutable_Data_IPFS_CID>`
    *   Remember, you **must use the wallet that controls the MDA** (the one holding its private key) for this transaction.
    *   This action creates a new transaction on the blockchain, updating the pointer to the latest mutable data.
    *   **Important Caveat**: You can only update the mutable data **once per blockchain block**.
6.  Once the transaction is confirmed, wallets reading the token's data will automatically display the updated information, such as the new token icon.

A key advantage of this system is that **all past updates remain recorded on the blockchain**, creating an immutable, auditable record of changes to the token's mutable data over time.

### A Simpler Alternative

The process described above involves several technical steps. If this seems too complex, an alternative exists: [TokenTiger.com](https://tokentiger.com). As of the video's recording, TokenTiger did not support fungible tokens but was working on it. It provides a more user-friendly interface that hides much of the underlying complexity.