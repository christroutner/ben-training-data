# Transaction Pools

Most nodes in the Bitcoin Cash network maintain a temporary list of unconfirmed transactions called the memory pool (mempool) or transaction pool. This pool tracks transactions that have been broadcast to the network but are not yet included in the blockchain. For example, wallet-holding nodes use the transaction pool to monitor incoming payments that have been received on the network but lack confirmation.

As transactions are received and verified, they're added to the transaction pool and relayed to neighboring nodes to propagate across the network. Some node implementations also maintain a separate pool of orphaned transactions—transactions whose inputs reference parent transactions that aren't yet known. These orphans are stored temporarily until their parent transactions arrive.

When a transaction is added to the transaction pool, the system checks the orphan pool for any orphans that reference this transaction's outputs (its children). Valid matching orphans are moved from the orphan pool to the transaction pool, completing the transaction chain starting with the parent. This process repeats recursively for any further descendants, potentially triggering a cascade reconstruction of interdependent transactions as orphans reunite with their parents.

Both the transaction pool and orphan pool are stored in local memory without persistent storage, dynamically populated from incoming network messages. When a node starts, both pools begin empty and gradually fill with new transactions from the network.