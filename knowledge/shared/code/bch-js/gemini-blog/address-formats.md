
**Addresses in bch-js**

`bch-js` provides tools for handling Bitcoin Cash addresses, which are essential for receiving and sending funds.

**Key Functions**

* **`detectAddressType(address)`**:  This function analyzes an address and determines its type (e.g., legacy, Cash Address).

    ```javascript
    // cashaddr with prefix
    bchjs.Address.detectAddressType('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');

    // cashaddr no prefix
    bchjs.Address.detectAddressType('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');

    // legacy
    bchjs.Address.detectAddressType('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74');

    // cashaddr testnet
    bchjs.Address.detectAddressType('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');

    // cashaddr testnet w/ no prefix
    bchjs.Address.detectAddressType('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');

    // legacy testnet
    bchjs.Address.detectAddressType('mqc1tmwY2368LLGktnePzEyPAsgADxbksi');
    ```
* **`fromXPub(xpub, path = '0/0')`**:  For working with HD (Hierarchical Deterministic) wallets, this function generates addresses from an extended public key (xpub) and derivation path.

    ```javascript
    let xpub = 'xpub6DF8uhdarytz3mWprhTwu569b3u1XL56ZWV52sAYrDWKxqx7wb2D8RjFKvCo9jn4VtTzuJZaunCuuk2SR5eTVn2h4hB5YGhk3sY7KUF5fzL';
    let address = bchjs.Address.fromXPub(xpub, "0/1");
    console.log(address)
    ```
* **`fromOutputScript(scriptPubKey, network = 'mainnet')`**:  This function derives a Bitcoin Cash address from a scriptPubKey.

    ```javascript
    let scriptPubKey = "76a91412ab496c949766e92621a3611b8644c77df2547588ac"
    let address = bchjs.Address.fromOutputScript(scriptPubKey)
    console.log(address)
    ```

**Address Formats**

`bch-js` handles both the older "legacy" address format and the newer Cash Address format, which is the preferred format for Bitcoin Cash.
