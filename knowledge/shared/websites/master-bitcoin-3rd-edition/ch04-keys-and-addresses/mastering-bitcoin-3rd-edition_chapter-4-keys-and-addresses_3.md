## Hash Functions and Payment Security

Bitcoin uses cryptographic hash functions to create compact commitments to larger data. A hash function takes input data of any size, scrambles it, and outputs a fixed-size value. For a secure hash function, it's computationally infeasible to find a different input that produces the same output. This allows Bitcoin to create secure commitments to public keys without revealing them until spending.

Bitcoin commonly uses SHA256 and RIPEMD-160 hash functions. To create commitments to public keys, Bitcoin applies SHA256 followed by RIPEMD-160 (known as HASH160), producing a 20-byte result instead of the 65-byte public key:

```
A = RIPEMD160(SHA256(K))
```

This hash can be used in Pay-to-Public-Key-Hash (P2PKH) scripts:
```
Output script: OP_DUP OP_HASH160 <Bob's key hash> OP_EQUALVERIFY OP_CHECKSIG
Input script: <Bob's signature> <Bob's public key>
```

When executed, this script duplicates the public key, hashes it, and verifies it matches the commitment from the output script before checking the signature. This system allows payments to be sent to much shorter 20-byte hashes rather than full public keys, making addresses more manageable while maintaining security.