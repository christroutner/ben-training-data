# Bitcoin Transactions Fundamentals

## Understanding Bitcoin Transactions

Unlike physical cash transactions, bitcoins aren't tangible tokens that can be handed from one person to another. Instead, Bitcoin operates more like a land registry, where a database on every Bitcoin full node records who controls what bitcoins. A transaction is the data structure used to convince nodes to update this database, transferring control from one person to another without directly using their identities.

When Alice pays Bob, she creates a transaction that tells the network to update its records to show that some of her bitcoins are now controlled by Bob. This transaction must follow specific rules and include various data fields that we'll examine in detail throughout this chapter.