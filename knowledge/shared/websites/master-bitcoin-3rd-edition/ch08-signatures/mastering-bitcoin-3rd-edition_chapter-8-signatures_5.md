## Serialization of Schnorr Signatures

A Schnorr signature in Bitcoin consists of two 32-byte values: the x-coordinate of kG (the public nonce) and s (the scalar). Even though both values could theoretically be represented with fewer than 32 bytes in some cases, they are always serialized as fixed 32-byte values to produce exactly 64 bytes.

When used with taproot keypath or scriptpath spending, a 64-byte Schnorr signature is considered to use the default signature hash SIGHASH_ALL. If an alternative sighash is used, a single additional byte is appended to specify the signature hash, making the signature 65 bytes.

This serialization is considerably more efficient than the DER encoding used for ECDSA signatures. The compact, fixed-size nature of Schnorr signatures makes them easier to work with and reduces transaction sizes.