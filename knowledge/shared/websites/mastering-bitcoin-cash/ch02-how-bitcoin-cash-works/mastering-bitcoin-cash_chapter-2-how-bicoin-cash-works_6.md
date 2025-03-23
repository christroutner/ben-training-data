## Block Creation and Confirmation

Miners build new blocks by selecting transactions from the mempool (pool of unverified transactions) and prioritizing them based on fees and other criteria. Each miner also includes a special coinbase transaction that pays newly created Bitcoin Cash to their own address—currently 12.5 BCH per block.

When a miner successfully finds a valid proof-of-work solution, they publish the new block to the network. Other nodes verify the block's validity and, if correct, add it to their copy of the blockchain before beginning work on the next block. Each block built on top of a previous block adds confirmation to the transactions in the earlier block.

For example, when Alice's coffee purchase transaction was included in block #538345, it received one confirmation. As additional blocks were mined on top, the transaction gained more confirmations. By convention, transactions with six or more confirmations are considered irreversible, as invalidating them would require an impractical amount of computational power.