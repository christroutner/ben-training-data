## Hierarchical Deterministic Wallets

HD wallets use a child key derivation (CKD) function that combines a parent key (private or public), a 256-bit chain code, and a 32-bit index number to create child keys. The chain code introduces randomness, ensuring that knowing a child key doesn't reveal siblings without the chain code.

The derivation process works by combining these inputs with HMAC-SHA512, producing a 512-bit hash that's split into two parts: the right 256 bits become the child's chain code, while the left 256 bits are combined with the parent private key to create the child private key. This can be repeated to create a tree of keys of infinite depth.

For enhanced security, HD wallets can use hardened derivation functions that break the relationship between parent public keys and child chain codes. Hardened keys (denoted with a prime symbol, e.g., m/0') prevent a compromised child key from revealing other keys in the tree. BIP0044 defines a standard HD wallet structure with five levels: purpose (44'), coin type (145' for Bitcoin Cash), account, change, and address index.

```
m / purpose' / coin_type' / account' / change / address_index
```

For example, the third receiving address for the primary Bitcoin Cash account would be at path M/44'/145'/0'/0/2.