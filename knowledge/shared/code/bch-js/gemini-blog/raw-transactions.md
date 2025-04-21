
**Working with Raw Transactions in bch-js**

`bch-js` provides tools to interact with the raw data of Bitcoin Cash transactions. This allows for fine-grained control over how transactions are constructed and processed.

**What are Raw Transactions?**

Raw transactions are the fundamental data structures that represent the transfer of Bitcoin Cash. They contain information about the inputs (where the coins are coming from), the outputs (where the coins are going), and other data.

**Key Functions**

* **`decodeRawTransaction(hex)`**:  This function takes a hexadecimal representation of a raw transaction and converts it into a JSON object. It can decode a single transaction or an array of them.

    ```javascript
    (async () => {
      try {
        let decodeRawTransaction = await bchjs.RawTransactions.decodeRawTransaction('01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000');
        console.log(decodeRawTransaction);
      } catch(error) {
        console.error(error);
      }
    })();
    ```
* **`decodeScript(script)`**:  Bitcoin Cash uses a scripting language. This function decodes a hexadecimal representation of a script.

    ```javascript
    (async () => {
      try {
        let decodeScript = await bchjs.RawTransactions.decodeScript('4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16');
        console.log(decodeScript);
      } catch(error) {
        console.error(error);
      }
    })();
    ```
* **`getRawTransaction(txid, verbose = false, usrObj = null)`**:  This retrieves the raw transaction data given a transaction ID (txid). The `verbose` option controls how much detail is returned.

    ```javascript
    (async () => {
      try {
        let getRawTransaction = await bchjs.RawTransactions.getRawTransaction("0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098");
        console.log(getRawTransaction);
      } catch(error) {
        console.error(error);
      }
    })();
    ```

**Example Use Case**

If you're building a complex wallet or an application that needs to analyze transactions at a low level, `bch-js`'s raw transaction functions are very useful.
