## Bitcoin Cash Addresses

Bitcoin Cash addresses come in multiple formats, with the most recent being the Cash Address format that typically begins with "bitcoincash:" prefix. Legacy Bitcoin Cash addresses begin with the number "1" and are derived from public keys through a one-way cryptographic hashing function. These addresses are 25-34 characters long, case-sensitive, and contain a checksum to prevent errors.

To create a Bitcoin Cash address from a public key, two hash functions are applied sequentially: first SHA256, then RIPEMD160. The resulting 160-bit hash is encoded using Base58Check, which includes version information and a checksum. The formula is:

```
Bitcoin Cash Address = Base58Check(version + RIPEMD160(SHA256(public key)))
```

This process ensures addresses are relatively short, contain built-in error-checking, and provide a standardized format for sending and receiving Bitcoin Cash. Addresses abstract away the complex underlying cryptography, making the system more user-friendly while maintaining security.