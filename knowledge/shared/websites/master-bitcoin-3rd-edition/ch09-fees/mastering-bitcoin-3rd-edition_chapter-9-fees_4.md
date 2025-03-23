## Replace By Fee (RBF) Fee Bumping

RBF fee bumping involves creating a conflicting version of a transaction that pays a higher fee. Transactions conflict when they each try to spend one of the same UTXOs. To prevent network abuse through excessive transaction creation, Bitcoin Core and other nodes that support transaction replacement require each replacement transaction to pay a higher fee rate than the transaction being replaced.

Bitcoin Core supports two variations of RBF:
- **Opt-in RBF**: Transactions can signal that they allow replacement with higher fee rate versions. This is specified in BIP125 and enabled by default in Bitcoin Core.
- **Full RBF**: Any unconfirmed transaction can be replaced with a higher fee rate version. This is optionally available in Bitcoin Core but disabled by default.

The existence of two variants stems from controversy around transaction replacement. Some merchants relied on the assumption that valid unconfirmed transactions would eventually confirm. Transaction replacement breaks this assumption since an alternative version might not pay the same outputs. As a compromise, Bitcoin Core implemented opt-in RBF, where only transactions signaling replacement permission could be replaced.

When implementing RBF fee bumping, a wallet creates a new transaction that spends at least one of the same UTXOs as the original transaction, usually keeping the same outputs that pay the receiver(s). The increased fee can be paid by reducing the change output value or adding additional inputs to the transaction.

The advantage of RBF is its efficiency in using block space. The disadvantage is that normally only the transaction creator can perform RBF fee bumping, with limited exceptions for specially designed transactions.