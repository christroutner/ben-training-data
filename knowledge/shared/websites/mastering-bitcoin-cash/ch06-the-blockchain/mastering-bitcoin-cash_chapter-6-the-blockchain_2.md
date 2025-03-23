# Block Structure and Identification

A block is a container data structure that aggregates transactions for inclusion in the blockchain. It consists of a header (80 bytes) containing metadata, followed by the transactions themselves that make up the bulk of its size. A full 32MB Bitcoin Cash block could contain nearly 128,000 transactions.

The block structure includes:

| Size               | Field               | Description                                                  |
| :----------------- | :------------------ | :----------------------------------------------------------- |
| 4 bytes            | Block Size          | The size of the block, in bytes, following this field        |
| 80 bytes           | BlockHeader         | Several fields form the block header                         |
| 1-9 bytes (VarInt) | Transaction Counter | How many transactions follow                                 |
| Variable           | Transactions        | The transactions recorded in this block                      |
| 4 bytes            | Sequence Number     | Currently disabled Tx-replacement feature, set to 0xFFFFFFFF |

The block header contains three sets of metadata:
1. A reference to the previous block hash
2. Mining competition data (difficulty, timestamp, nonce)
3. The merkle tree root, which efficiently summarizes all transactions in the block

Blocks have two primary identifiers:
1. Block hash - a unique cryptographic fingerprint derived from the header
2. Block height - the position in the blockchain (not unique, as competing blocks can exist at the same height)

A block hash always identifies a single block uniquely, while multiple blocks might share the same block height during forks.