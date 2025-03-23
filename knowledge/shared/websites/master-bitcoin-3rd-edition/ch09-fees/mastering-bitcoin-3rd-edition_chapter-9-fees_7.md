## Transaction Pinning

While both RBF and CPFP fee bumping work in basic cases, rules designed to prevent denial-of-service attacks can sometimes prevent effective fee bumping. This is called "transaction pinning."

In the context of RBF, Bitcoin Core accepts replacement transactions only if they pay more fees than all transactions that will be forgotten (the original plus descendants). This means if Alice creates a small transaction paying Bob, and Bob creates a large child transaction, Alice would need to pay a fee larger than what both she and Bob originally paid to replace her transaction.

For CPFP, Bitcoin Core limits a parent transaction to having a maximum of 25 ancestors or descendants in its mempool and limits the total size of all those transactions to 100,000 vbytes. This prevents users from creating CPFP fee bumps if a transaction already has too many descendants.

Transaction pinning can happen accidentally, but it also represents a serious vulnerability for multiparty time-sensitive protocols like Lightning Network. If a counterparty can prevent transaction confirmation by a deadline, they might be able to steal funds. Protocol developers have worked on mitigating these problems, with solutions like CPFP carve out and anchor outputs.