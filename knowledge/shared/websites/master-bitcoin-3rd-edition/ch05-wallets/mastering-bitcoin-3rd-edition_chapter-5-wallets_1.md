# Wallet Recovery in Bitcoin

## Independent vs Deterministic Key Generation

In early Bitcoin wallets, each private and public key pair was independently generated. This required users to back up their wallet database frequently, especially when generating new addresses to receive payments. Failure to back up before receiving funds to a new address would result in permanent loss of those bitcoins.

Modern wallets use deterministic key generation instead of independent generation. This means all keys are derived from a single random seed using a repeatable algorithm. With deterministic generation, users only need to back up the seed once to ensure recovery of all current and future keys in their wallet.

Independent key generation created significant backup challenges. Each separately generated key required about 32 bytes to back up, plus overhead. To maintain privacy, users would create new key pairs for each transaction, making backups extremely cumbersome.