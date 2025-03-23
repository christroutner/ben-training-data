## Segregated Witness (SegWit)

Segregated Witness (SegWit) is an upgrade to Bitcoin that separates signature data ("witness") from transaction data. SegWit transactions use new script types:

### Pay to Witness Public Key Hash (P2WPKH)

A P2WPKH output script is much simpler than P2PKH:
```
0 ab68025513c3dbd2f7b92a94e0581f5d50f654e7
```

The first number (0) is the witness version, and the second part is the 20-byte public key hash. When spending, the signature is provided in a separate witness structure rather than in the input script.

### Pay to Witness Script Hash (P2WSH)

P2WSH is the SegWit equivalent of P2SH, using a 32-byte SHA256 hash (rather than the 20-byte RIPEMD160(SHA256()) hash in P2SH):
```
0 a9b7b38d972cabc7961dbfbcb841ad4508d133c47ba87457b4a0e8aae86dbb89
```

SegWit can also be embedded within P2SH scripts (nested SegWit), allowing wallets that don't support SegWit to still pay to SegWit-enabled wallets. This creates addresses starting with "3" that can be used by any Bitcoin wallet.

Benefits of SegWit include reduced transaction fees, increased block capacity, and elimination of transaction malleability issues.