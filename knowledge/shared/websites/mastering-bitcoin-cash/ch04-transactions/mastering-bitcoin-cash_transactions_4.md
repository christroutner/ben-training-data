# UTXOs: The Building Blocks of Transactions

The fundamental building block of a Bitcoin Cash transaction is an unspent transaction output (UTXO). UTXOs are indivisible chunks of currency locked to specific owners and recognized as currency units by the entire network. When users receive Bitcoin Cash, it's recorded as a UTXO in the blockchain.

There are no accounts or balances in Bitcoin Cash; instead, a user's "balance" is derived by scanning the blockchain and aggregating all UTXOs belonging to that user. A UTXO can have any value (denominated in satoshis, with 1 bitcoin = 100,000,000 satoshis), but once created, it's indivisible like a coin that cannot be cut in half.

When creating a transaction, if a UTXO is larger than the required amount, it must be consumed entirely, with change returned to the sender. For example, spending 1 BCH from a 20 BCH UTXO requires creating two outputs: one paying 1 BCH to the recipient and another returning 19 BCH in change to the sender.

```javascript
// Example of finding UTXOs for an address
bitbox.Address.utxo('bitcoincash:qpcxf2sv9hjw08nvpgffpamfus9nmksm3chv5zqtnz').then((result) => {
  console.log(result);
}, (err) => {
  console.log(err);
});
```