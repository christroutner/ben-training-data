## Double-Entry Bookkeeping Model

Bitcoin Cash's transaction structure effectively implements a distributed double-entry bookkeeping system. Each transaction debits (inputs) funds from one or more accounts and credits (outputs) them to new accounts, with the constraint that inputs must exactly balance with outputs plus any transaction fees.

This accounting model ensures that Bitcoin Cash are neither created nor destroyed in regular transactions—they merely change ownership. The only exception is the special coinbase transaction in each block that mints new coins according to the protocol's predetermined issuance schedule.

This double-entry model is inherently auditable, as the flow of funds can be traced through the entire transaction history back to the point where the coins were originally mined. This provides complete transparency while maintaining the pseudonymity of users, as the "accounts" in this ledger are cryptographic addresses rather than personal identities.