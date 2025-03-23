# Simplified Payment Verification (SPV)

Merkle trees enable Simplified Payment Verification (SPV), which allows nodes to validate transactions without downloading full blocks. SPV nodes are lightweight clients that store only block headers (80 bytes each) rather than complete blocks.

When an SPV node needs to verify that a transaction is included in the blockchain, it follows this process:

1. The SPV node establishes a bloom filter on its connections to peers, specifying addresses of interest
2. When a peer finds a transaction matching the filter, it sends a "merkleblock" message
3. This message contains the block header and a merkle path that links the transaction to the merkle root
4. The SPV node uses the merkle path to verify the transaction is included in the block
5. The node then uses the block header to confirm the block is part of the blockchain

This approach is extremely efficient - an SPV node needs less than a kilobyte of data (block header and merkle path) to verify a transaction, compared to a full block that might be 1MB or larger. This efficiency makes it possible to run Bitcoin Cash wallets on devices with limited storage and bandwidth, such as mobile phones.