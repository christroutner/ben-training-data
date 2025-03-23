# Network Discovery Process

When a new node boots up, it must discover existing Bitcoin Cash nodes to participate in the network. The geographic location of other nodes is irrelevant since the network topology isn't geographically defined. The discovery process begins with connecting to at least one known node randomly selected from the network.

To establish a connection, nodes use a TCP connection (usually on port 8333) and initiate a handshake by transmitting a version message containing identifying information:

- PROTOCOL_VERSION: The version of the Bitcoin Cash P2P protocol
- nLocalServices: List of local services supported by the node
- nTime: Current time
- addrYou: IP address of the remote node
- addrMe: IP address of the local node
- subver: Type of software running on the node
- BestHeight: Block height of the node's blockchain

The peer responds with a verack message to acknowledge and establish the connection, potentially sending its own version message if it wants to reciprocate the connection.

New nodes find peers through DNS seeds (DNS servers providing lists of Bitcoin Cash node IP addresses) or through direct IP address specification. After establishing initial connections, a node will send an addr message with its own IP address to neighbors, who forward it to their neighbors. The node can also request IP addresses of other peers using getaddr messages, enabling it to find more peers and advertise its existence on the network.