## Adjusting Mining Difficulty

Bitcoin's target difficulty is adjusted to maintain a 10-minute average block interval, regardless of how computational power changes over time. This adjustment happens automatically and independently on every node every 2,016 blocks (approximately every two weeks).

The adjustment is based on the ratio between the actual timespan of the previous 2,015 blocks and the desired timespan of 20,160 minutes (two weeks). If the network finds blocks faster than every 10 minutes, the difficulty increases (target decreases). If block discovery is slower than expected, the difficulty decreases (target increases).

To prevent extreme volatility, the adjustment is limited to a factor of four per cycle. If greater adjustment is needed, it will be accomplished in subsequent retargeting periods. This retargeting mechanism ensures Bitcoin's "heartbeat" remains constant over long periods despite changes in mining technology and participation.

Importantly, the mining difficulty is independent of transaction volume. Bitcoin can scale up without requiring increased hashing power for security. The mining market is primarily influenced by the cost of electricity in relation to bitcoin's exchange rate, as this determines mining profitability.