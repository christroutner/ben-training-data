## Backing Up Key Derivation Paths

In an HD wallet, there are approximately 4 billion first-level keys, with each having 4 billion possible children, and so on. When recovering from a seed, a wallet needs to know which specific paths in this vast tree were actually used.

Two approaches solve this problem:

1. **Implicit Paths**: Following standardized paths defined by BIPs. For example, BIP44 defines `m/44'/0'/0'` for P2PKH scripts. Most single-signature wallets use implicit paths.

2. **Explicit Paths**: Backing up the exact path information with the recovery code. This approach typically uses the Output Script Descriptors standard, which explicitly describes scripts and the keys or key paths used with them.

Example descriptors:
```
pkh(02c6…​9ee5)  # P2PKH script for the provided public key
sh(multi(2,022f…​2a01,03ac…​ccbe))  # P2SH multisignature requiring two signatures
pkh([d34db33f/44'/0'/0']xpub6ERA…​RcEL/1/*)  # P2PKH scripts for keys at path M/1/* of the specified xpub
```

Wallets designed for multiple signatures or advanced scripts increasingly use explicit paths with descriptors, while single-signature wallets typically follow standardized implicit paths.