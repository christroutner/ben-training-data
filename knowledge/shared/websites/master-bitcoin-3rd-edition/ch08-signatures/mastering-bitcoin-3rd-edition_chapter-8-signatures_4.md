## Schnorr Signatures

Schnorr signatures, published by Claus Schnorr in 1989, were introduced to Bitcoin through the Taproot soft fork. They have several important properties:

1. **Provable security**: Security depends only on the Discrete Logarithm Problem difficulty and the random oracle model.
2. **Linearity**: Schnorr signatures have the properties of additivity and homogeneity, making it easy for multiple parties to coordinate without sharing secrets.
3. **Batch verification**: Multiple Schnorr signatures can be verified simultaneously in less time than it would take to verify each signature independently.

The basic Schnorr protocol works as follows:

1. The signer selects a private key x and derives public key xG
2. To sign, the signer generates a private nonce k and derives public nonce kG
3. The challenge scalar e is calculated as hash(kG || xG || m), where m is the message
4. The signature is calculated as s = k + ex
5. The signature consists of kG and s
6. Verification checks if sG == kG + hash(kG || xG || m) × xG

Bitcoin's implementation of Schnorr signatures follows BIP340, which includes the public key in the challenge hash to protect BIP32 unhardened derivation and to support additional protocols built on Schnorr signatures.