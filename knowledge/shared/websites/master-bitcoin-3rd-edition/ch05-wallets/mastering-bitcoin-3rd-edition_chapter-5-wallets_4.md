## Hierarchical Deterministic (HD) Key Generation

Hierarchical Deterministic (HD) wallets, defined in BIP32, are now used by virtually all modern Bitcoin wallets. They combine deterministic key generation with public child key derivation to produce a tree of keys where any key can be the parent of another sequence of child keys.

This tree structure allows for organizational meaning - different branches can represent different purposes, such as one branch for receiving payments and another for change addresses. In corporate settings, branches might represent departments, subsidiaries, or accounting categories.

HD wallets are created from a single root seed (128, 256, or 512 bits). The root seed is input into the HMAC-SHA512 algorithm, producing a 512-bit hash. The left 256 bits become the master private key, and the right 256 bits become the master chain code. The master private key generates a corresponding master public key using elliptic curve multiplication. From these master keys, entire trees of child keys can be derived.

![HD wallet tree](https://github.com/bitcoinbook/bitcoinbook/raw/develop/images/mbc3_0503.png)