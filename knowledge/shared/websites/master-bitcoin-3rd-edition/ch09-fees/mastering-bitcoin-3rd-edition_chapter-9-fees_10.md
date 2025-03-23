## Timelock Defense Against Fee Sniping

Fee sniping is a theoretical attack where miners try to rewrite past blocks by "sniping" higher-fee transactions from future blocks to maximize profitability. For example, instead of mining block #100,001, miners might attempt to remine block #100,000 but include high-fee transactions from the current mempool.

Currently, this attack isn't very lucrative because block subsidies are much higher than total fees per block. However, as transaction fees eventually become the majority of miner rewards, this scenario becomes more likely.

Several wallets discourage fee sniping by creating transactions with a lock time that limits them to being included only in the next block or later blocks. In our example, a wallet would set lock time to 100,001. This prevents miners from including these transactions in remined blocks, making fee sniping less profitable.

This approach doesn't entirely prevent fee sniping but helps preserve network stability as block subsidies decline. It's recommended that wallets implement anti-fee sniping measures when they don't interfere with other uses of the lock time field.