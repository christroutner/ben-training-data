## Serialization of ECDSA Signatures

ECDSA signatures in Bitcoin use the Distinguished Encoding Rules (DER) format for serialization. A DER-encoded signature consists of the following elements:

1. 0x30: Indicates the start of a DER sequence
2. Length of the sequence
3. 0x02: Indicates an integer value follows
4. Length of the R integer
5. R value
6. 0x02: Indicates another integer follows
7. Length of the s integer
8. s value
9. A suffix (e.g., 0x01 for SIGHASH_ALL) indicating the hash type

This serialization is more complex and typically longer than the fixed-size format used for Schnorr signatures, contributing to larger transaction sizes when ECDSA is used.