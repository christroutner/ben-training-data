**Transaction Building with bch-js**

`bch-js` simplifies the process of creating Bitcoin Cash transactions using the `TransactionBuilder` class. [cite: 78, 79]

**Transaction Construction**

Building a transaction involves specifying inputs (UTXOs you want to spend), outputs (addresses and amounts to send to), and signing the transaction with the appropriate private keys. [cite: 79]

**Key Functions**

* **`addInput(txid, vout, sequence)`**:  

    ```javascript
    transactionBuilder.addInput(
        '61e89bfbcbb9699451456104411d1b82d460ce1c79a611b93f3f0562a6581667',
        0
      )
    ```

* **`addOutput(address, value)`**:

    ```javascript
    transactionBuilder.addOutput(
        'bitcoincash:qpuax2tar50jgw0ya067r6n6z076l69gkqmpy2za09',
        1000
      )
    ```

* **`sign(vin, keyPair, redeemScript, hashType, value)`**:

    ```javascript
    // keypair
    let keyPair = bchjs.HDNode.toKeyPair(hdnode);
    // empty redeemScript variable
    let redeemScript;
    // sign w/ keyPair
    transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount, transactionBuilder.signatureAlgorithms.SCHNORR);
    ```

* **`build()`**:

    ```javascript
    // build tx
    let tx = bchjs.transactionBuilder.build();
    ```
