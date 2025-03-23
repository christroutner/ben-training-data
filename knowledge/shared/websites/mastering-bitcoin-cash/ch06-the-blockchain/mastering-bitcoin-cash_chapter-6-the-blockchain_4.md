# Merkle Trees Fundamentals

Merkle trees (binary hash trees) are data structures used in Bitcoin Cash to efficiently summarize and verify large sets of data. Each block contains a merkle tree that summarizes all its transactions, providing a compact digital fingerprint of the entire transaction set.

A merkle tree is constructed bottom-up by recursively hashing pairs of nodes until only a single hash remains - the merkle root. Bitcoin Cash uses double-SHA256 (SHA256 applied twice) as its hashing algorithm. This structure allows for extremely efficient verification: to check if a transaction is included in a block with N transactions, only 2*log₂(N) calculations are needed.

The construction process works as follows:
1. Each transaction is hashed with double-SHA256 to create leaf nodes (HA, HB, HC, etc.)
2. Pairs of leaf nodes are concatenated and hashed together to form parent nodes (HAB = SHA256(SHA256(HA + HB)))
3. This pairing and hashing continues up the tree until reaching the single merkle root
4. The 32-byte merkle root is stored in the block header, effectively summarizing all transactions

If there's an odd number of transactions to hash, the last transaction hash is duplicated to create an even number of leaf nodes, ensuring a balanced binary tree.