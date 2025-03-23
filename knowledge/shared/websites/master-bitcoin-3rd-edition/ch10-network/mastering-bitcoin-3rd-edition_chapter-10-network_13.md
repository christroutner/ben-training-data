## Mempools and Orphan Pools

Most Bitcoin nodes maintain a temporary list of unconfirmed transactions called the memory pool (mempool). This helps nodes track transactions known to the network but not yet included in the blockchain. As transactions are verified, they're added to the mempool and relayed to neighboring nodes.

Some implementations also maintain a separate orphan pool for transactions whose inputs reference transactions that aren't yet known. When a parent transaction arrives, its child transactions can be validated and moved from the orphan pool to the mempool, potentially triggering a cascade of validations for interdependent transactions.

Many Bitcoin implementations also maintain a UTXO database containing all unspent outputs on the blockchain. Unlike the mempool and orphan pools (which represent a node's local perspective and may vary between nodes), the UTXO database represents the network's emergent consensus and should be consistent across nodes. This database is stored on persistent storage and contains millions of entries dating back to the genesis block.