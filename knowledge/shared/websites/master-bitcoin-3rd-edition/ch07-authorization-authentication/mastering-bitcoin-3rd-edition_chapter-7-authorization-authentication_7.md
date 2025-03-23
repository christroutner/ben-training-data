## OP_RETURN for Data Recording

Bitcoin's blockchain can be used for applications beyond payments, such as digital notary services. The `OP_RETURN` operator allows storing small amounts of data in a transaction output without bloating the UTXO set.

`OP_RETURN` scripts look like:
```
OP_RETURN <data>
```

The data portion often represents a hash, sometimes with an application-specific prefix. For example, the Proof of Existence digital notarization service uses the prefix `DOCPROOF`.

An important property of `OP_RETURN` outputs is that they are explicitly provably unspendable - there's no way to satisfy them, so they don't need to be stored in the UTXO set. These outputs are typically assigned zero bitcoins since any funds sent to them would be permanently lost.

This approach represents a compromise in the debate over storing non-payment data on the blockchain. It allows data to be recorded without permanently bloating the UTXO set that full nodes must maintain.