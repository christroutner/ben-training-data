**2. Getting Token Metadata (Icons, etc.)**

SLP tokens can have associated metadata, like names, tickers, document URLs, and even mutable data like token icons following specifications like PS002 and PS007.

* `getTokenData(tokenId, withTxHistory?, sortOrder?)`: Retrieves both immutable (genesis) and mutable data associated with a token ID. Optionally includes transaction history (useful for tracking NFT ownership).
* `getTokenData2(tokenId, updateCache?)`: Specifically focuses on fetching token icons and media URLs, potentially looking up data on IPFS. It might be faster or slower than `getTokenData` depending on caching and network conditions.
* `cid2json({ cid })`: If `getTokenData` returns an IPFS Content Identifier (CID) for metadata, this function (primarily available with the `consumer-api` interface) can retrieve the JSON object stored at that CID.

```javascript
const BchWallet = require('minimal-slp-wallet');

async function fetchTokenMetadata(tokenId) {
  // Use consumer-api for cid2json functionality if needed
  const slpWallet = new BchWallet(undefined, { interface: 'consumer-api' });
  await slpWallet.walletInfoPromise;
   // No need to initialize if just fetching public token data

  try {
    console.log(`Workspaceing data for Token ID: ${tokenId}`);

    // --- Method 1: getTokenData ---
    const tokenData = await slpWallet.getTokenData(tokenId, false); // Set true for TX history
    console.log("\n--- getTokenData() Result ---");
    console.log(JSON.stringify(tokenData, null, 2));

    // If mutable data CID exists, try fetching JSON (consumer-api only)
    if (tokenData?.mutableData?.metaDataCid && slpWallet.ar.interface === 'consumer-api') {
        console.log("\nFetching JSON from mutable CID:", tokenData.mutableData.metaDataCid);
        const mutableJson = await slpWallet.cid2json({ cid: tokenData.mutableData.metaDataCid });
        console.log("Mutable Metadata JSON:", JSON.stringify(mutableJson, null, 2));
    }


    // --- Method 2: getTokenData2 ---
    // const tokenMedia = await slpWallet.getTokenData2(tokenId);
    // console.log("\n--- getTokenData2() Result ---");
    // console.log(JSON.stringify(tokenMedia, null, 2));


  } catch (err) {
    console.error("Error fetching token data:", err);
  }
}

// Replace with a token ID known to have metadata
const tokenIdWithMeta = '59a62f35b0882b7c0ed80407d9190b460cc566cb6c01ed4817ad64f9d2508702';
fetchTokenMetadata(tokenIdWithMeta);
```
