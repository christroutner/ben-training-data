## Wallets and Keys

Bitcoin Cash wallets manage the cryptographic keys that provide access to funds on the blockchain. Rather than storing actual coins, wallets maintain collections of keys that allow signing transactions to spend associated funds. Wallets also track available unspent transaction outputs (UTXOs) that can serve as inputs for new transactions.

When creating a payment, wallet applications handle all the complex details of transaction construction, including selecting appropriate inputs, creating correct outputs, calculating change, and applying digital signatures. This happens automatically in response to simple user commands like specifying a recipient address and amount to send.

An important aspect of Bitcoin Cash wallets is that transactions can be constructed offline. Similar to writing a check at home and later sending it to the bank, a Bitcoin Cash transaction can be created while disconnected from the network and transmitted later when connectivity is available.