# Transaction Fees

Most transactions include fees that compensate miners for securing the network. Transaction fees are implied as the difference between the sum of inputs and the sum of outputs:

```
Fees = Sum(Inputs) – Sum(Outputs)
```

Fees serve as both an incentive to include transactions in blocks and a disincentive against spam. They're calculated based on transaction size in kilobytes, not transaction value in Bitcoin Cash. Miners prioritize transactions with sufficient fees for inclusion in the next block, while transactions with insufficient fees might be delayed or not processed.

It's important when creating transactions to account for all inputs. If you consume a 20 BCH UTXO to make a 1 BCH payment, you must include a 19 BCH change output back to your wallet. Otherwise, the 19 BCH "leftover" becomes a transaction fee collected by miners—likely not what you intended.