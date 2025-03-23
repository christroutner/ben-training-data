## Merkle Trees

Each Bitcoin block contains a summary of all its transactions using a merkle tree (binary hash tree), a data structure that efficiently summarizes and verifies large data sets. Merkle trees in Bitcoin use the double-SHA256 hash function and allow verification of whether a transaction is included in a block with only about log₂(N) calculations.

Merkle trees are constructed bottom-up by first hashing each transaction, then recursively hashing pairs of elements until only one hash remains - the merkle root. This 32-byte root is stored in the block header. For example, with four transactions A, B, C, and D, the leaves of the tree would be their hashes (HA, HB, HC, HD). The parent nodes are created by concatenating and hashing pairs (HAB = SHA256(SHA256(HA || HB))). This continues until the single merkle root is calculated.

If there are an odd number of elements at any level, the last element is duplicated to create an even number. This duplication creates a design flaw in Bitcoin's implementation that can allow certain sequences of transactions to produce the same merkle root. Bitcoin Core defends against this vulnerability by detecting duplicate hashes at the end of a list and treating them as invalid.

```
HA = SHA256(SHA256(Transaction A))
HAB = SHA256(SHA256(HA || HB))
```

For a tree with 16 transactions, to prove a specific transaction is included, a node only needs to produce approximately log₂(N) hashes (4 hashes in this case) as an authentication path. This efficiency becomes more pronounced as the number of transactions increases - even for blocks with thousands of transactions, the proof remains small (10-12 hashes or 320-384 bytes).