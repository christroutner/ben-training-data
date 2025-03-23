# Transaction Fees in Bitcoin

## Understanding Transaction Fees and Conflicting Transactions

The Bitcoin network has a limited number of blocks produced in a given time, with each block having limited space for transactions. When Alice creates a digital signature to pay Bob, she's committing to a specific transaction. However, she can create another signature for a transaction paying someone else using the same output (bitcoins) she used to pay Bob. These are called "conflicting transactions" because only one can be included in the valid blockchain.

To protect against conflicting transactions, Bob should wait until Alice's transaction is confirmed in the blockchain to a sufficient depth. For a transaction to be confirmed, it must be included in a block. Miners select which transactions to include in blocks, and typically select transactions that maximize their revenue. This mechanism is called "transaction fees", which operates more like a bid in an auction than a fixed fee. Transactions bid for limited block space, and miners prioritize transactions with higher fees.