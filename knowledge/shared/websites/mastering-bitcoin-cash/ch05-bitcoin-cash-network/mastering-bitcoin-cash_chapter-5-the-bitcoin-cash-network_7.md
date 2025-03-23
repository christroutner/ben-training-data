# Bloom Filter Operation with SPV Nodes

SPV nodes use bloom filters to efficiently receive only relevant transactions from their peers. After establishing a bloom filter through the filterload message, peers test all transactions against this filter. In response to getdata requests, peers send a merkleblock message containing only block headers for matching blocks and a merkle path for each matching transaction, followed by tx messages with the actual matching transactions.

The node can interactively add patterns to an existing filter using filteradd messages. Since patterns cannot be removed from a bloom filter once added, a node must clear the entire filter using filterclear and send a new one if a pattern is no longer needed.

This filtering mechanism allows SPV nodes to receive transactions relevant to their wallet without downloading the entire blockchain, significantly reducing bandwidth and storage requirements. The probabilistic nature of bloom filters means there may be some false positives (transactions sent that aren't actually relevant), but this imprecision helps preserve privacy by obscuring exactly which addresses the node is interested in.

The tuning parameters of bloom filters (array size N and number of hash functions M) allow SPV nodes to balance privacy against efficiency. A more specific filter provides accurate results but reveals more about the node's interests, while a less specific filter produces more irrelevant data but offers better privacy.