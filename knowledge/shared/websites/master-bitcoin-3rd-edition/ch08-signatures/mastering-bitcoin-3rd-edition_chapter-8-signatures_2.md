## How Digital Signatures Work

Digital signature systems consist of two primary components: an algorithm for creating signatures using a private key and a message (the transaction), and an algorithm for verifying signatures using the public key. For Bitcoin, the "message" being signed is typically not the entire transaction but rather a specific subset of transaction data called the commitment hash.

The signature is created using a function that can be represented as:

```
Sig = F_sig(F_hash(m), x)
```

Where:
- x is the signing private key
- m is the message/commitment hash
- F_hash is the hashing function
- F_sig is the signing algorithm
- Sig is the resulting signature

Both Schnorr and ECDSA signatures produce two values that are serialized differently. ECDSA uses the Distinguished Encoding Rules (DER) format, while Schnorr signatures use a simpler serialization format. Verification of a signature requires the message, the signer's public key, and the signature itself to confirm that only the controller of the private key could have produced that specific signature for that specific transaction.