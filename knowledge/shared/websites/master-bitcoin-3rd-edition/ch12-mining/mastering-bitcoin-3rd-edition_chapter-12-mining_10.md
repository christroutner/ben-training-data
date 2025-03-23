## Blockchain Assembly and Consensus

The final part of Bitcoin's consensus mechanism is the assembly of blocks into chains and the selection of the chain with the most proof of work. Each node independently tries to add new blocks to its existing blockchain by linking to the parent block referenced in the block's header.

Most often, a new block extends the current best chain. Sometimes, however, a block might not extend the best chain, creating a temporary fork. Nodes handle this by attaching the new block to a secondary chain and comparing the work between chains. If the secondary chain now has more cumulative work, the node reorganizes its view to follow this new best chain.

By selecting the chain with the greatest cumulative work, all nodes eventually achieve consensus. This method resolves temporary discrepancies as more work is added to one of the chains. Most forks are resolved within one block, though occasionally they might extend to two blocks if found almost simultaneously.

Bitcoin's 10-minute block interval represents a design compromise between fast confirmation times and the probability of forks. A faster block time would make transactions appear to confirm more quickly but lead to more frequent blockchain forks, while a slower block time would decrease forks but make settlement seem slower.