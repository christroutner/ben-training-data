## Blockchain Synchronization

When a new full node connects to peers, it must construct a complete chain of block headers. Starting with only the genesis block, it downloads hundreds of thousands of blocks to synchronize with the network.

The node first exchanges `version` messages with peers to determine their blockchain heights. It then uses `getheaders` messages to request headers from peers with longer blockchains. Peers respond with up to 2,000 headers at a time via a `headers` message.

In parallel, the node requests the actual blocks using `getdata` messages, distributing requests across multiple peers. It maintains a queue of up to 1,024 blocks, dropping connections to slow peers. As blocks are received and validated, they're added to the blockchain. The process continues until the node catches up to the network and is performed whenever a node has been offline for an extended period.