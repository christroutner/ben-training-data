## Node Types and Roles

Though full nodes in the Bitcoin P2P network are equal, they may perform different functions. Full nodes validate blocks and may handle routing, mining, and wallet services. Archival full nodes maintain a complete copy of the blockchain to serve data to lightweight clients.

Lightweight clients (also called SPV clients) store only a subset of the blockchain and verify transactions using simplified payment verification. Miners work to create new blocks by solving the proof-of-work algorithm. Some miners operate full nodes that validate the entire blockchain, while others participate in pool mining relying on pool servers. User wallets might connect to full nodes or, particularly on resource-constrained devices like smartphones, operate as lightweight nodes.