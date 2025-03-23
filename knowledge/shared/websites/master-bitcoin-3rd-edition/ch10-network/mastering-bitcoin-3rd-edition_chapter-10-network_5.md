## Private Block Relay Networks

Although compact blocks significantly reduce block propagation time, specialized private relay networks can further minimize latency. These networks use techniques that aren't suitable for the public P2P network due to trade-offs in decentralization and trust.

One approach is to preselect routes between endpoints, using servers near major internet infrastructure. Another technique is Forward Error Correction (FEC), which splits compact block messages into parts with redundant data, allowing reconstruction of missing parts without waiting for retransmission.

A third approach assumes all nodes have similar transactions in their mempools, allowing relay of the same compact block without recalculation at each hop. These methods work well with centralization but sacrifice the trustless nature of decentralized networks.

The original Bitcoin Relay Network created by Matt Corallo in 2015 was replaced in 2016 with FIBRE (Fast Internet Bitcoin Relay Engine). FIBRE uses UDP-based relay with FEC and compact block optimization to further reduce data transmitted and network latency.