**Blog Post 9: Script Manipulation with bch-js**

The `Script` module in `bch-js` allows you to create and manipulate Bitcoin Cash scripts. Scripts are a fundamental part of how Bitcoin Cash transactions are validated.

**What are Scripts?**

Bitcoin Cash uses a scripting language called Script to define the conditions that must be met for someone to spend coins. Scripts are embedded in transaction outputs.

**Key Functions**

* **`decode(hex)`**: Decodes a hexadecimal representation of a script.
* **`encode(asm)`**: Encodes an assembly representation of a script into hexadecimal.

**Why is Script Important?**

Scripts enable features like:

* Pay-to-Public-Key-Hash (P2PKH): The most common type of Bitcoin Cash transaction, where coins are locked to a specific address.
* Multi-signature wallets: Requiring multiple private keys to authorize a transaction.
* Other complex spending conditions.

`bch-js`'s `Script` module makes it possible to programmatically create and analyze these scripts.
