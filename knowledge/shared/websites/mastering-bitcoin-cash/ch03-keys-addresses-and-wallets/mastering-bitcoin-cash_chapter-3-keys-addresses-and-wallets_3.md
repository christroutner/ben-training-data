## Public Key Cryptography and Mathematical Foundations

Public key cryptography relies on mathematical functions that are easy to calculate in one direction but practically infeasible to reverse. Bitcoin Cash uses elliptic curve multiplication for its cryptographic foundation, which enables the creation of secure digital signatures and keys.

In this system, a key pair consists of a private key and a public key derived from it. When spending Bitcoin Cash, the owner presents their public key and a signature created from their private key. The signature can be validated against the public key without revealing the private key itself, allowing network participants to verify transaction validity.

Key pairs are typically stored together for convenience, though technically only the private key needs to be stored since the public key can be calculated from it. The relationship between private keys, public keys, and Bitcoin Cash addresses follows a clear progression: private key (k) → elliptic curve multiplication → public key (K) → cryptographic hash function → Bitcoin Cash address (A).