## Package Relay

Early Bitcoin Core versions didn't limit the number of unconfirmed transactions in their mempools. Later versions limited mempool size to store only the highest fee rate transactions or packages. This creates a dependency problem for CPFP: to calculate a package fee rate, nodes need both parent and child transactions, but if the parent doesn't pay a high enough fee rate, it won't be kept in the mempool.

Package relay solves this by allowing transactions to be relayed as a package, enabling receiving nodes to evaluate the fee rate of the entire package before acting on individual transactions. As of writing, significant progress has been made on implementing package relay in Bitcoin Core.

This feature is especially important for protocols based on time-sensitive presigned transactions, such as Lightning Network. In non-cooperative scenarios, some transactions can't be fee bumped using RBF and must rely on CPFP. If a presigned transaction pays too low a fee rate to enter the mempool, there's no way to fee bump it with a child transaction. Package relay solves this critical problem.