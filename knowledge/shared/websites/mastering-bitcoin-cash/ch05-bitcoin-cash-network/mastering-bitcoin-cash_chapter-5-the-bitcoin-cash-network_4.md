# Blockchain Synchronization

After connecting to peers, a full node's first task is constructing a complete blockchain. Starting with only the genesis block, a new node must download hundreds of thousands of blocks to synchronize with the network. This process begins with comparing blockchain heights between peers using the version message's BestHeight information.

Nodes exchange getblocks messages containing the hash of their local blockchain's top block. A peer with a longer blockchain can identify which blocks the other node needs to catch up. It identifies the first 500 blocks to share and transmits their hashes using an inventory (inv) message. The node missing these blocks retrieves them with getdata messages requesting full block data based on the hashes received.

For example, a node with only the genesis block will receive inv messages from peers containing hashes of the next 500 blocks in the chain. It requests these blocks from multiple connected peers to distribute the load, tracking how many blocks are "in transit" per connection to avoid overwhelming any single peer. As each block is received, it's added to the local blockchain, and this process continues until the node is synchronized with the network.

This synchronization method applies whenever a node goes offline temporarily. Whether missing a few blocks or thousands of blocks, the node follows the same process of comparing its blockchain with peers and downloading missing blocks.