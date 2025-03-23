## Transaction Scripts and Public Keys

In Bitcoin, when Alice pays Bob, she doesn't directly use his public key. Instead, she creates an output script that defines conditions for spending the bitcoins, while Bob later provides an input script that satisfies those conditions. This script-based approach allows for flexible spending conditions beyond simple public key verification.

The original Bitcoin implementation used a very basic script for payments called Pay-to-Public-Key (P2PK):
```
Output script: <Bob's public key> OP_CHECKSIG
Input script: <Bob's signature>
```

When executed, these scripts combine into `<Bob's signature> <Bob's public key> OP_CHECKSIG`. The OP_CHECKSIG operation consumes the signature and public key from the stack, verifies the signature is valid for this transaction, and returns 1 if valid or 0 if invalid. The transaction is valid if a non-zero value remains on the stack.

While this system works, P2PK requires communicating a full public key (65 bytes) to the sender, which proved unwieldy. P2PK was primarily used in early Bitcoin versions but has since been replaced by more efficient methods.