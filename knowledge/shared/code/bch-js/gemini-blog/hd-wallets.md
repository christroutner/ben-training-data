**HD Wallets and Key Derivation in bch-js**

Hierarchical Deterministic (HD) wallets provide a way to manage multiple Bitcoin Cash addresses from a single seed. `bch-js` has utilities to work with HD nodes. [cite: 1589, 1590]

**Key Concepts**

* **HD Node**: A node in a tree-like structure where each node can derive child nodes. Each node corresponds to a private key and public key. [cite: 1590, 1591]
* **Seed**: The starting point for generating all the keys in an HD wallet. It's crucial to keep this seed safe! [cite: 1592, 1593]
* **Derivation Path**: A sequence of numbers used to derive specific keys within the HD wallet structure. [cite: 1593]

**Key Functions**

* **`fromSeed(rootSeedBuffer, network = 'mainnet')`**: Creates an HD node from a seed.

    ```javascript
    // create seed buffer from mnemonic
    let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
    // create HDNode from seed buffer
    let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
    ```

* **`toLegacyAddress(hdNode)`**: Gets the legacy address from an HD node.

    ```javascript
    // create mnemonic
    let mnemonic = bchjs.Mnemonic.generate(128);
    // create seed buffer from mnemonic
    let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
    // create HDNode from seed buffer
    let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
    // to cash address
    bchjs.HDNode.toCashAddress(hdNode);
    // bitcoincash:qq549jxsjv66kw0smdju4es2axnk7hhe9cquhjg4gt
    ```

* **`toCashAddress(hdNode, regtest = false)`**: Gets the Cash Address from an HD node.

    ```javascript
    // create mnemonic
    let mnemonic = bchjs.Mnemonic.generate(128);
    // create seed buffer from mnemonic
    let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
    // create HDNode from seed buffer
    let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
    // to cash address
    bchjs.HDNode.toCashAddress(hdNode);
    // bitcoincash:qq549jxsjv66kw0smdju4es2axnk7hhe9cquhjg4gt
    ```


**Benefits of HD Wallets**

HD wallets make it easy to back up your wallet (you only need the seed), and they enhance privacy by allowing you to generate new addresses for each transaction. [cite: 1593]
