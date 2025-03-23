# Transaction Creation and Broadcasting

Transactions can be created online or offline by anyone, even if that person isn't authorized to sign it. Similar to paper checks, Bitcoin Cash transactions express the intent to transfer money and need to be submitted for execution. Once created, a transaction must be signed by the owner(s) of the source funds to be valid.

Broadcasting a transaction to the Bitcoin Cash network requires delivering it to any Bitcoin Cash node so it can be propagated and included in the blockchain. Because transactions are signed and contain no confidential information, they can be transmitted over any network—secure or insecure—including WiFi, Bluetooth, NFC, or even methods like text messages or forum posts.

When a transaction reaches a node, it's validated. If valid, the node propagates it to other connected nodes, creating a flooding effect where the transaction rapidly spreads across the network in an exponentially expanding pattern. Each node independently validates transactions before propagation, preventing malformed transactions from spreading beyond a single node.