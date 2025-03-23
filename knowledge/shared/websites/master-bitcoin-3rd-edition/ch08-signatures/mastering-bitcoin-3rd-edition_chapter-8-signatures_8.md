## ECDSA Signatures

Before Schnorr signatures were added to Bitcoin, ECDSA was the only digital signature protocol supported. ECDSA was developed in the early 1990s as an alternative when Schnorr's patent prevented its use in open standards and open source software. ECDSA remains supported for all non-taproot transactions.

Compared to Schnorr signatures, ECDSA has several disadvantages:
- It's more complex, requiring more operations to create or verify signatures
- It has less provable security, lacking a complete proof that depends only on the ECDLP and ROM
- It's nonlinear, making it difficult to create scriptless multisignatures

In ECDSA, signatures consist of two values, R and s. The algorithm works as follows:

1. Generate a private nonce k and derive a public nonce K
2. R is the x-coordinate of K
3. Calculate s = k^(-1) × (Hash(m) + x × R)
4. Verification computes K = s^(-1) × Hash(m) × G + s^(-1) × R × X
5. If the x-coordinate of K equals R, the signature is valid