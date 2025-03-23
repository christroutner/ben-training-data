## Private and Public Child Key Derivation

HD wallets use a child key derivation (CKD) function that combines:
- A parent private or public key
- A chain code (256 bits)
- An index number (32 bits)

For private child key derivation, the parent key, chain code, and index are combined and hashed with HMAC-SHA512. The resulting 512-bit hash is split in half. The right half becomes the child chain code, while the left half is added to the parent private key to produce the child private key.

Child private keys are indistinguishable from random keys and can be used to make public keys and Bitcoin addresses. The child key derivation process can be repeated to create grandchildren, great-grandchildren, and so on to arbitrary depth.

Public child key derivation allows deriving child public keys directly from parent public keys without knowing the private keys. This enables useful security arrangements where a server can generate new addresses without having any private keys. The mechanism is similar to private key derivation but uses the parent public key as input.

An important consideration when using extended public keys is the "gap limit" - the maximum number of unused keys in a row a wallet will scan before stopping. If all keys up to the gap limit remain unused, the wallet must either refuse new requests, generate keys beyond the gap limit (risking recovery issues), or reuse previously distributed keys (compromising privacy).