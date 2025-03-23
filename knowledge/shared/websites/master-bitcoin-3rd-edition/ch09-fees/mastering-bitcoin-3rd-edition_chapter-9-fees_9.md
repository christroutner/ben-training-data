## How Transaction Fees Work

Bitcoin transactions do not have an explicit field for fees. Instead, fees are implicit - calculated as the difference between the sum of inputs and the sum of outputs:

```
Fees = Sum(Inputs) - Sum(Outputs)
```

This design can be confusing for those constructing their own transactions. You must ensure you account for all inputs by creating appropriate change outputs, or you'll inadvertently pay a large transaction fee. For example, if you spend a 20-bitcoin UTXO to make a 1-bitcoin payment, you must include a 19-bitcoin change output back to your wallet. Otherwise, the 19-bitcoin "leftover" becomes a transaction fee claimed by miners.