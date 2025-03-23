# Transaction Chaining and Orphan Transactions

Transactions form chains where one transaction spends the outputs of previous transactions (parents) and creates outputs for subsequent transactions (children). Sometimes entire chains of interdependent transactions are created simultaneously for complex workflows.

When transactions are transmitted across the network, they don't always arrive in sequential order. If a child transaction arrives before its parent, nodes place it in a temporary "orphan transaction pool" until the parent arrives. Once the parent arrives, orphans referencing the parent's outputs are released from the pool, revalidated, and the entire chain can be processed.

This mechanism ensures valid transactions aren't rejected simply because their parent is delayed. There is a limit to the number of orphan transactions stored in memory (defined as MAX_ORPHAN_TRANSACTIONS) to prevent denial-of-service attacks. If this limit is exceeded, randomly selected orphan transactions are evicted from the pool.