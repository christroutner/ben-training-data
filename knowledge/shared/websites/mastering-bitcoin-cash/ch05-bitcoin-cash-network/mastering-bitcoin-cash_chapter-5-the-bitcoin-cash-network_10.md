# Network Communication Flow

Bitcoin Cash nodes communicate by exchanging messages using a simple, extensible protocol. Each message contains a message header with a command name (command) indicating the message type, followed by the message payload. This design allows nodes to process messages they recognize while ignoring those they don't understand, facilitating backward-compatible upgrades.

When seeking blockchain updates, nodes use getblocks messages to request block inventories, receiving inv messages with up to 500 block hashes. They then request specific blocks with getdata messages and receive complete block data through block messages. SPV nodes use a similar process but request only headers through getheaders messages, receiving up to 2,000 headers in a single headers message.

Inventory messages (inv) are used throughout the network to announce transaction or block availability. When a node receives an inv message announcing data it doesn't have, it requests that data with getdata. If the inv message indicates a block, the node requests the block with getdata and receives it through a block message. For transactions, the response comes as a tx message.

This communication protocol enables efficient data propagation across the network while allowing nodes to request only the data they need, whether they're full nodes synchronizing the entire blockchain or SPV nodes collecting only headers and specific transactions relevant to their wallet addresses.