# Keys and Addresses in Bitcoin

## Public Key Cryptography and Bitcoin

Public key cryptography forms the foundation of Bitcoin's security model. It uses mathematical functions that are easy to calculate in one direction but infeasible to reverse. Bitcoin specifically uses elliptic curve multiplication, where a private key (k) is multiplied by a generator point (G) to produce a public key (K). This relationship can be expressed as K = k × G.

The private key is a randomly generated number between 0 and n-1, where n is the order of the elliptic curve (approximately 1.1578 × 10^77^). This number must be kept secret as it grants control over bitcoins. The public key is derived from the private key and can be shared with others to receive funds. When transactions are created, the private key generates signatures that can be verified against the public key without revealing the private key itself.

Bitcoin uses the secp256k1 curve, defined by y² = (x³ + 7) mod p, where p is a large prime number (2^256^ – 2^32^ – 2^9^ – 2^8^ – 2^7^ – 2^6^ – 2^4^ – 1). While mathematically complex, this curve enables the creation of unforgeable digital signatures that prove ownership of bitcoins.