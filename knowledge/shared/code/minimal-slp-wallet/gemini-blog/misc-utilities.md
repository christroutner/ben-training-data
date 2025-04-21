**4. Other Utilities**

* `getTransactions(bchAddress?, sortingOrder?)`: Fetches the transaction history (array of TXIDs and heights) for an address.
* `getTxData(txids)`: Retrieves detailed transaction data for an array of up to 20 TXIDs.
* `getUsd()`: Gets the current spot price of BCH in USD.
* `getKeyPair(hdIndex?)`: Generates a specific key pair (WIF, public key, addresses) from the mnemonic at a given HD index (defaults to index 0).
* `getPubKey(addr)`: Attempts to find the public key associated with an address (if it has made an outgoing transaction). Useful for encryption.
* `broadcast({ hex })`: Broadcasts a raw, hex-encoded transaction to the network.
* `getPsfWritePrice()`: Gets the cost in PSF tokens to write 1MB of data via the PSFFPP IPFS pinning service.
