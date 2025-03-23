# Bloom Filters for SPV Privacy

SPV nodes need to retrieve specific transactions to verify them, which creates a privacy risk by potentially revealing the addresses in their wallet to third parties monitoring the network. To address this privacy concern, Bitcoin Cash implemented bloom filters shortly after introducing SPV/lightweight nodes.

A bloom filter is a probabilistic search filter that allows SPV nodes to request transactions matching specific patterns without revealing exactly which addresses they're interested in. It's implemented as a variable-size array of binary digits (a bit field) with a variable number of hash functions that always produce outputs between 1 and N (corresponding to the array positions).

To add a pattern to a bloom filter:
1. The pattern is hashed by each hash function in turn
2. Each hash function produces a number between 1 and N
3. The corresponding bit in the array is set to 1
4. This process is repeated for all hash functions
5. The pattern is now "recorded" in the filter as M bits changed from 0 to 1

As more patterns are added, bits may overlap, causing the filter to become less accurate—this is why it's a probabilistic data structure. When testing if a pattern is part of a bloom filter, if all bits indexed by the hash functions are set to 1, the pattern is probably in the filter (a "Maybe, Yes" result). However, if any bit is 0, the pattern is definitely not in the filter (a "Definitely Not" result).

An SPV node initializes an empty bloom filter and adds search patterns matching the transaction outputs corresponding to its wallet addresses. After sending the filter to peers using a filterload message, peers test each transaction against the filter and only send matching transactions to the node.