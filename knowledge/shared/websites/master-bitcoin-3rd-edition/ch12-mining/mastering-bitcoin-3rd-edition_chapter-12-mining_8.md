## Median Time Past (MTP)

Bitcoin distinguishes between wall clock time and consensus time. In a decentralized network, each participant has their own time perspective, and network latency must be considered. To prevent manipulation of block timestamps, Bitcoin implements two consensus rules: no node will accept blocks with timestamps more than two hours in the future, and no node will accept blocks with timestamps less than or equal to the median time of the last 11 blocks (called Median Time Past or MTP).

MTP was introduced as part of BIP113 to strengthen the security of timelocks and remove incentives for miners to lie about block times. By using the median of approximately two hours in the past, the influence of any single block's timestamp is reduced, and no single miner can manipulate timestamps to gain fees from timelocked transactions prematurely.

This consensus time calculation affects all timelock implementations including lock time, CLTV, sequence, and CSV. MTP is usually about one hour behind wall clock time, which should be accounted for when creating timelock transactions.