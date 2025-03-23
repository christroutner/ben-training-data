## Compact Block Relay

When a miner finds a new block, they announce it to the network. Other miners need to receive this block quickly to avoid working on outdated chains, which could lead to block-finding races. These races disadvantage smaller miners and work against Bitcoin's decentralization goals.

In 2015, Bitcoin Core introduced compact block relay (BIP152) to accelerate block propagation and reduce bandwidth usage. This feature allows nodes to transmit only the information that receiving nodes don't already have. Since full nodes that relay unconfirmed transactions store many of these in their mempools, compact blocks send 6-byte identifiers for transactions instead of full transaction data. The receiving node can check if it already has these transactions in its mempool and only request the missing ones.

Bitcoin Core implements two modes of compact block relay:

* **Low-bandwidth mode**: The peer sends only the block header hash without details, saving bandwidth when the receiving node might get the block from another source.
* **High-bandwidth mode**: The peer sends the compact block before full verification, only ensuring the proof of work is correct. This minimizes propagation delays at each hop.

While the names might be confusing, both modes significantly reduce bandwidth compared to pre-compact block methods.