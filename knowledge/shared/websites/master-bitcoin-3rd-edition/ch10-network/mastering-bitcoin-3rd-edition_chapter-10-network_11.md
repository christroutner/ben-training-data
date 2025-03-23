## Compact Block Filters

To address the privacy and denial-of-service issues with bloom filters, compact block filters were introduced. Instead of clients sending filters to nodes, nodes create filters for each block that clients can download and check against their addresses.

Compact block filters use Golomb-Rice Coded Sets (GCS) for efficient data encoding. The filters include two types of information: the script for every output in every transaction in a block, and the script of the output being spent by every input in every transaction in a block.

These filters ensure a 100% true positive match rate, meaning a wallet will find every transaction affecting it. There is a small false positive rate, causing wallets to occasionally download blocks without relevant transactions, but this is a minor bandwidth cost and can even improve privacy.

To protect against dishonest peers providing inaccurate filters, clients can download filter commitments from multiple peers. If peers advertise different filters for the same block, the client can download all of them and the associated block to determine which filter is accurate.