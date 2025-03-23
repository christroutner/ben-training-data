## Bloom Filters

Bloom filters are probabilistic search filters that allow lightweight clients to request transactions matching specific patterns without revealing exactly which addresses they're searching for. This helps preserve privacy while reducing bandwidth requirements.

A bloom filter is implemented as a variable-size array of binary digits with a variable number of hash functions. The filter is initialized with all zeros. To add a pattern, it's hashed by each function in turn, and the corresponding bits in the array are set to 1. When multiple patterns are added, they may set overlapping bits to 1, gradually decreasing the filter's accuracy.

To test if a pattern is in the filter, it's hashed by each function and checked against the bit array. If all corresponding bits are 1, the pattern is probably in the filter (a "Maybe, yes" result). If any bit is 0, the pattern is definitely not in the filter (a "Definitely not" result).

Lightweight clients initialize an empty bloom filter, add addresses, keys, and transaction IDs from their wallet to it, then send it to peers using a `filterload` message. Peers check incoming transactions against this filter and only forward matching transactions. Unfortunately, bloom filters provide limited privacy protection, as a node can apply a client's filter to the entire blockchain to identify the client's transactions and find patterns between them.