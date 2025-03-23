## Linking Blocks in the Blockchain

Bitcoin full nodes validate every block after the genesis block and continuously update their local view of the blockchain as new blocks arrive. To establish links between blocks, nodes examine each incoming block's header looking for the "previous block hash" field, which must match the hash of the last known block to form a valid chain.

For example, if a node has 277,314 blocks in its local blockchain copy with the last block having a specific hash, any new valid block must contain that hash in its "previousblockhash" field. When this match is found, the node adds the new block to the end of its chain, extending it to a new height.

This linking mechanism creates an unbroken chain of cryptographic commitments, with each block referencing its predecessor. The interconnected nature of the blockchain ensures its integrity - any attempt to alter a block would invalidate all subsequent blocks by breaking this chain of references.