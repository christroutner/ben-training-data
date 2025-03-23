## Full Nodes

Full nodes verify every transaction in every block on the valid blockchain with the most proof of work. They independently process all blocks starting from the genesis block, building up to the latest known block in the network, allowing them to authoritatively verify any transaction.

A full node maintains the UTXO (unspent transaction output) set, representing all bitcoin available to be spent. It receives updates about new transaction blocks from the network, verifies them, and incorporates them into its UTXO view. Running a full node provides the purest Bitcoin experience: independent verification without trusting any other systems.

While there are alternative implementations of full nodes built with different programming languages and architectures, Bitcoin Core is the most common, representing more than 95% of full nodes on the network.