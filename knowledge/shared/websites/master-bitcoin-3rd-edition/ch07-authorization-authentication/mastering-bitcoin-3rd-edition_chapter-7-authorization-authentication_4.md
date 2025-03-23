## Pay to Public Key Hash (P2PKH)

The most common traditional transaction type in Bitcoin is Pay to Public Key Hash (P2PKH), which creates an output script that contains a hash of a public key. P2PKH is the basis for legacy Bitcoin addresses starting with "1".

A P2PKH output script looks like:
```
OP_DUP OP_HASH160 <Key Hash> OP_EQUALVERIFY OP_CHECKSIG
```

The `<Key Hash>` is the data encoded in a legacy Bitcoin address. This output can be spent with an input script of:
```
<Signature> <Public Key>
```

When executed together, these scripts verify that:
1. The provided public key hashes to the expected key hash
2. The signature is valid for that public key and commits to the transaction being created

The script execution first duplicates the public key, hashes it, and verifies it matches the hash in the output script. Then it checks that the provided signature is valid for that public key, thus authenticating the spender.