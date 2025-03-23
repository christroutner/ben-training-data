## Fee Rate Estimation

Fee rates work as bids in an auction, with lower fee rates typically requiring longer waiting times for confirmation. Paying too low a fee rate could result in a transaction never confirming. While perfect prediction of required fee rates isn't possible, estimates can be generated based on recent transaction data.

Full nodes can record when they received transactions, when those transactions were confirmed, and the fee rates paid. By analyzing this data, nodes can estimate how many blocks it will take to confirm a transaction at various fee rates. Bitcoin Core includes a fee rate estimator accessible via the `estimatesmartfee` RPC:

```
$ bitcoin-cli -named estimatesmartfee conf_target=144
{
  "feerate": 0.00006570,
  "blocks": 144
}
```

Many web-based services also provide fee estimation APIs. Fee estimation can never be perfect, especially when market demand changes. If fee rates decrease, previously normal transactions might now be considered high-priority and confirm sooner. If fee rates increase, transactions may be stuck with too low a fee rate, creating a need for methods to increase fee rates on pending transactions, known as "fee bumping."