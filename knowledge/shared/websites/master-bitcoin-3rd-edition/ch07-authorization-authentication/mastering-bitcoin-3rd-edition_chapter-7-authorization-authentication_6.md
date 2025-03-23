## Pay to Script Hash (P2SH)

Pay to Script Hash (P2SH) was introduced in 2012 to simplify the use of complex scripts. Instead of requiring the entire script in the output, P2SH uses a hash of the script, making complex transactions easier to use.

With P2SH, a complex script (called the redeem script) is hashed, and only the hash is included in the output. When spending, the spender provides both the original redeem script and the data needed to satisfy it.

For example, a complicated multisignature output like:
```
2 <Mohammed's PubKey> <Partner1 PubKey> <Partner2 PubKey> <Partner3 PubKey> <Attorney PubKey> 5 OP_CHECKMULTISIG
```

Can be replaced with a P2SH output script:
```
OP_HASH160 <hash of redeem script> OP_EQUAL
```

P2SH addresses start with "3" and can be used by any Bitcoin wallet, allowing anyone to pay to a complex script without needing to understand it.

P2SH offers several benefits:
- It simplifies payment to complex scripts
- It shifts the burden of data storage from the output to the input
- It defers the cost of storing the complex script from payment time to spending time
- It shifts transaction fee costs from sender to recipient