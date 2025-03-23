## Network Discovery

New Bitcoin nodes must discover existing nodes to join the network. Geographic location is irrelevant since Bitcoin's network topology isn't geographically defined. To connect, nodes establish a TCP connection (usually to port 8333) and begin a "handshake" by transmitting a `version` message containing identifying information like protocol version, supported services, current time, IP addresses, software type, blockchain height, and relay preferences.

The receiving node examines this information and, if compatible, acknowledges with a `verack` message to establish the connection. New nodes discover peers through several methods:

1. Querying DNS seeds (DNS servers providing lists of Bitcoin node IP addresses)
2. Using IP addresses of known Bitcoin nodes provided manually
3. Receiving introductions from already-connected nodes

After establishing connections, a node sends an `addr` message with its IP address to neighbors, who forward it to their neighbors. The node can also send `getaddr` to request IP addresses of other peers. This process ensures the node becomes well-known and better connected in the network.

Nodes maintain connections to several peers for diverse network paths. Since connections are unreliable as nodes come and go, nodes continue discovering new peers while assisting others with bootstrapping. After rebooting, nodes attempt to reconnect to previously successful peers before falling back to seed nodes.