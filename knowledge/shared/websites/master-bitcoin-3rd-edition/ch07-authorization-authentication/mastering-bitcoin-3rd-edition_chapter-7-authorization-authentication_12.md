## Taproot and Tapscript

Taproot combines MAST with pay-to-contract techniques to create an even more efficient and private smart contract system. It allows spending either through a mutual satisfaction path (requiring signatures from all participants) or through a script tree.

Taproot works by tweaking a public key (which could belong to an individual or require multiple signatures) with the commitment to a merkle tree of scripts. This means the contract can be satisfied either by a signature from all participants or by revealing a specific script path.

The two spending methods are:
1. **Keypath spending**: Using just a signature (from an individual or multiple participants through scriptless multisignatures)
2. **Scriptpath spending**: Revealing and satisfying one of the scripts in the tree

Keypath spending is extremely efficient and private - a transaction created this way looks identical to a regular single-signature transaction, making it impossible to determine whether it was created by a single user or multiple participants in a complex contract.

Taproot was activated in November 2021 and uses a modified version of Script called Tapscript, which includes:
- Replacement of `OP_CHECKMULTISIG` with `OP_CHECKSIGADD`
- Exclusive use of Schnorr signatures
- New `OP_SUCCESSx` opcodes to enable future soft fork upgrades