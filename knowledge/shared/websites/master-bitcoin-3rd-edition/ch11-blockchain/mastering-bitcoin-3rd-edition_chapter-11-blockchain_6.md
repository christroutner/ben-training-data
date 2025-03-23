## Merkle Trees and Lightweight Clients

Merkle trees are crucial for lightweight clients (nodes that don't download full blocks). These clients verify transaction inclusion by using merkle paths rather than downloading all transactions in a block. When a lightweight client is interested in specific transactions (like payments to its wallet addresses), it establishes a bloom filter on its peer connections to limit received transactions to only those of interest.

When a peer finds a matching transaction, it sends a "merkleblock" message containing the block header and a merkle path connecting the transaction to the merkle root. The lightweight client uses this path to verify that the transaction is genuinely included in the block, and then uses the block header to link the block to the blockchain. This process provides proof that the transaction is recorded in the blockchain while requiring less than a kilobyte of data - over a thousand times less than a full block (approximately 2 MB).

This efficiency makes Bitcoin usable on devices with limited resources, such as mobile phones or IoT devices, without sacrificing security for the specific transactions relevant to the user.