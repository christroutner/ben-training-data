## Hash Time Lock Contracts (HTLC)

Hash Time Lock Contracts (HTLCs) extend payment channels with smart contracts that allow participants to commit funds to a redeemable secret with an expiration time. The "hash" component works by having the payment recipient create a secret R, then calculate its hash H = Hash(R). Anyone who learns the secret R can redeem the funds locked by the hash H.

The "time lock" component ensures that if the secret isn't revealed within a specified timeframe, the payer can reclaim their funds. A basic HTLC script might look like:

```
IF
    # Payment if you have the secret R
    HASH160 <H> EQUALVERIFY
    <Receiver Public Key> CHECKSIG
ELSE
    # Refund after timeout.
    <lock time> CHECKLOCKTIMEVERIFY DROP
    <Payer Public Key> CHECKSIG
ENDIF
```

Anyone who knows the secret R can use the first clause to claim the funds. If the secret isn't revealed before the timelock expires, the payer can reclaim their funds using the second clause. HTLCs can be modified to restrict redemption to specific recipients by adding signature requirements to the first clause, making them versatile building blocks for more complex payment systems.