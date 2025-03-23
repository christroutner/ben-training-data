# Merkle Tree Efficiency and Validation Paths

The efficiency of merkle trees becomes increasingly significant as the number of transactions grows. With a merkle tree, proving that a specific transaction is included in a block requires only log₂(N) 32-byte hashes, forming what's called a merkle path or authentication path.

| Number of Transactions | Approx. block size | Path size (hashes) | Path size (bytes) |
| :--------------------- | :----------------- | :----------------- | :---------------- |
| 16 Tx                  | 4 Kilobytes        | 4 hashes           | 128 bytes         |
| 512 Tx                 | 128 Kilobytes      | 9 hashes           | 288 bytes         |
| 2048 Tx                | 512 Kilobytes      | 11 hashes          | 352 bytes         |
| 65,535 Tx              | 16 megabytes       | 16 hashes          | 512 bytes         |

As shown in the table, while block size increases linearly with the number of transactions, the merkle path grows logarithmically. This means that even with 65,535 transactions in a 16MB block, the merkle path needed to verify a single transaction is only 512 bytes.

To verify transaction inclusion with a merkle path, a node only needs:
1. The transaction hash
2. The merkle path (a sequence of hashes to combine with the transaction hash)
3. The block header containing the merkle root

The node then recalculates the merkle root using the provided path and verifies it matches the merkle root in the block header.