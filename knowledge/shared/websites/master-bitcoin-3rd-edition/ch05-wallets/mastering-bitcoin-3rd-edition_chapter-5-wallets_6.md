## Backing Up Non-Key Data

While keys are the most critical wallet data, modern wallets store other important information that can't be regenerated from a recovery code, such as transaction labels and metadata. When Bob creates an address to invoice Alice, he typically adds a label to identify the payment. Similarly, Alice labels her outgoing payment to Bob. These labels are stored only in their respective wallets and aren't shared on the blockchain.

Without backing up this label data, a user who restores from a recovery code will see only a list of transaction dates and amounts, making it difficult to determine what each transaction was for. This would be like having a bank statement with dates and amounts but no descriptions.

Some wallets implement automatic encrypted backups of the entire wallet database, using a key derived from the seed to encrypt the data. This allows safe storage on untrusted services while maintaining the ability to recover all wallet data when needed.

For wallets supporting additional protocols like Lightning Network, backing up more than just the recovery code becomes even more critical. Lightning Network provides static channel backups but can't guarantee recovery in all scenarios.