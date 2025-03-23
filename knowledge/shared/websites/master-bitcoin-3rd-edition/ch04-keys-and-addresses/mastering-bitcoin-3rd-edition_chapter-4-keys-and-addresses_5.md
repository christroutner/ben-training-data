## Compressed Public Keys

A significant optimization in Bitcoin was the introduction of compressed public keys. Since an elliptic curve is symmetrical around the x-axis, a public key's y-coordinate can be derived from its x-coordinate and a single bit indicating whether y is even or odd. This allows public keys to be represented in just 33 bytes instead of 65 bytes.

An uncompressed public key begins with the prefix 0x04 followed by the x and y coordinates:
```
K = 04F028892BAD7ED57D2FB57BF33081D5CFCF6F9ED3D3D7F159C2E2FFF579DC341A07CF33DA18BD734C600B96A72BBC4749D5141C90EC8AC328AE52DDFE2E505BDB
```

A compressed public key uses prefix 0x02 if y is even or 0x03 if y is odd, followed by just the x-coordinate:
```
K = 03F028892BAD7ED57D2FB57BF33081D5CFCF6F9ED3D3D7F159C2E2FFF579DC341A
```

Both forms represent the same public key, but using compressed keys results in smaller transactions, allowing more payments per block. Compressed public keys became the standard in Bitcoin and are required for certain protocol features. However, they produce different address hashes than uncompressed keys, so a single private key can generate two different Bitcoin addresses depending on which public key format is used.