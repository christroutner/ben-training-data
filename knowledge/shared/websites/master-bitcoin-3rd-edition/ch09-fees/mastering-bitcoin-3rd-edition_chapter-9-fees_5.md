## Child Pays For Parent (CPFP) Fee Bumping

Anyone who receives the output of an unconfirmed transaction can incentivize miners to confirm that transaction by spending that output in a child transaction. Since miners must confirm the parent transaction to include the child transaction, they will evaluate the profitability of confirming both transactions together as a package.

To evaluate package profitability, miners calculate the "package fee rate" by dividing the aggregate fees of all transactions in the package by their aggregate size. Miners sort all individual transactions and packages by fee rate and include the highest-revenue ones in their blocks. This process, called "ancestor fee rate mining," has been implemented in Bitcoin Core for years and is used by most miners.

CPFP has several advantages over RBF. Any recipient of a transaction output can use CPFP, including both payment recipients and the spender (if they included a change output). It also doesn't replace the original transaction, making it less disruptive to merchants than RBF.

The primary disadvantage of CPFP is that it typically uses more block space. Unlike RBF where a replacement might be the same size as the original, CPFP adds an entirely separate transaction, requiring more fees to cover the additional space used.