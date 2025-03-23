## Wallet Types and Security

Wallets are containers for private keys that come in various forms. The first Bitcoin Cash clients used Type-0 nondeterministic wallets ("Just a Bunch Of Keys" or JBOK), which generate random keys with no relationship to each other. These wallets require frequent backups as each key must be preserved separately.

More advanced are deterministic (seeded) wallets, where all keys derive from a common seed through one-way hash functions. The seed (a random number) combined with other data like index numbers generates private keys. A single backup of the seed is sufficient to recover all derived keys, simplifying wallet backups and migration.

Hierarchical Deterministic (HD) wallets (BIP0032/BIP0044) organize keys in a tree structure, with parent keys able to derive sequences of children keys. This adds organizational meaning to key relationships and enables public key derivation without access to private keys. HD wallets are created from a single root seed, often represented as a mnemonic phrase (BIP0039) of 12-24 English words that encode the random seed value.