# Bitcoin as an Application Platform

## Bitcoin's Building Blocks (Primitives)

Bitcoin provides several fundamental guarantees that serve as building blocks for creating second-layer applications. These primitives include: no double-spend, which ensures a UTXO cannot be spent twice in the same valid chain; immutability, which makes transactions practically unchangeable once they've accumulated sufficient confirmations; neutrality, allowing any valid transaction to be propagated regardless of origin; and secure timestamping, which prevents blocks with invalid timestamps.

Additional primitives include authorization through digital signatures, auditability of all transactions, accounting that ensures inputs equal outputs plus fees, nonexpiration of valid transactions, and integrity that prevents modification of signed transactions. Bitcoin also provides transaction atomicity (transactions are either fully valid or invalid), discrete units of value, quorum of control through multisignature schemes, timelocks, data replication across the network, forgery protection, blockchain consistency, and predictable issuance limited to under 21 million bitcoins.

These primitives can be combined to create applications such as Proof-of-Existence (digital notary), crowdfunding platforms like Lighthouse, and payment channels. The list of building blocks continues to grow as new features are introduced to Bitcoin.