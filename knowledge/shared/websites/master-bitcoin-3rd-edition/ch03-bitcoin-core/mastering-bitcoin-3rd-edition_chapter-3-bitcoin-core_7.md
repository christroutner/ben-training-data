## Exploring and Decoding Transactions

You can retrieve and examine any transaction using its transaction ID (txid) with the `getrawtransaction` command, which returns the serialized transaction in hexadecimal:

```
$ bitcoin-cli getrawtransaction 466200308696215bbc949d5141a49a4138ecdfdfaa2a8029c1f9bcecd1f96177
01000000000101eb3ae38f27191aa5f3850dc9cad00492b88b72404f9da13569
...
```

To decode this into a human-readable format, use the `decoderawtransaction` command:

```
$ bitcoin-cli decoderawtransaction [hex-string]
```

The output shows the transaction's components, including inputs, outputs, values, and destination addresses. Each transaction input references a previous transaction's output via its txid. By following these references, you can trace chains of transactions backward through the blockchain to see how bitcoins move between owners.

Note that transaction IDs are not completely authoritative until confirmed in a block due to transaction malleability, which allows modifications to unconfirmed transactions that change their txids.