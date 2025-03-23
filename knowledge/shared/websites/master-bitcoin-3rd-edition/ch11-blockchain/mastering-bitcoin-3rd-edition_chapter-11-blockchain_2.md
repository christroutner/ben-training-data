## Block Structure

A block is a container data structure that aggregates transactions for inclusion in the blockchain. It consists of a header containing metadata (80 bytes) and a list of transactions that make up the bulk of its size (up to about 4,000,000 bytes). This makes a complete block almost 50,000 times larger than just its header.

The block header contains six fields: Version (4 bytes), Previous Block Hash (32 bytes), Merkle Root (32 bytes), Timestamp (4 bytes), Target (4 bytes), and Nonce (4 bytes). The nonce, target, and timestamp are used in the mining process. The Previous Block Hash links to the parent block, while the Merkle Root provides a cryptographic commitment to all transactions in the block.

Blocks are identified in two ways: by their cryptographic hash (block header hash) or by their position in the blockchain (block height). The block hash uniquely identifies a block and is computed by each node as the block is received. Block height refers to its position relative to the genesis block (at height 0), but unlike the hash, it's not a unique identifier since two blocks might temporarily compete for the same position during a fork.