## Transaction Chain and Ledger

Once a transaction is embedded in the blockchain, it becomes part of the distributed ledger visible to all Bitcoin Cash applications. Full-index clients can verify transactions by tracking funds from their creation through each transaction to their current state. Lightweight clients can perform simplified payment verification by confirming the transaction appears in the blockchain with several confirmations, providing assurance of its validity.

The outputs from confirmed transactions become available for spending in future transactions. For instance, when Bob receives payment from Alice, he can create new transactions that reference Alice's payment as an input, transferring value to new recipients. This creates an ongoing chain of transactions recorded on the blockchain.

Merchants often aggregate multiple small incoming payments into a single larger outgoing transaction, consolidating their funds for operational efficiency. As these transactions continue, they extend the chain recorded on the global blockchain ledger, visible and verifiable by all participants in the network.