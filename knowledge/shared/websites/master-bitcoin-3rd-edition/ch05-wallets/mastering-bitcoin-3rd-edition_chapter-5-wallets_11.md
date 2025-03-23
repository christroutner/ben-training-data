## HD Wallet Path Structure

Keys in an HD wallet are identified using a path naming convention with levels separated by slash (/) characters. Private keys derived from the master private key start with "m", while public keys derived from the master public key start with "M".

Some examples:
- m/0: First child private key from master
- m/0/0: First grandchild from first child
- m/0'/0: First normal grandchild from first hardened child
- M/23/17/0/0: First great-great-grandchild public key following that path

The BIP44 standard defines a structured five-level path format:
```
m / purpose' / coin_type' / account' / change / address_index
```

- purpose: Always 44' for BIP44 wallets
- coin_type: 0' for Bitcoin, 1' for Bitcoin Testnet, etc.
- account: Allows users to subdivide wallets (0', 1', etc.)
- change: 0 for receiving addresses, 1 for change addresses
- address_index: Sequential index for addresses (0, 1, 2, etc.)

This standardized structure helps organize HD wallets in a consistent way across different implementations while maintaining the flexibility of the HD wallet tree.