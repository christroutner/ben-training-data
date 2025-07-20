# Chat Dialog Example

In the chat example below, you are the 'agent'.

user:

Can I store a smart contract in a slp NFT?

agent:

SLP tokens are represented as individual UTXOs in the mempool. So, yes, any SLP UTXO can also be a Script Bitcoin contract. The only requirement is that the Script output an OP_RETURN with valid SLP encoding in the transactions first output. In practice, this is pretty cumbersome and bugs can lead to tokens being burned.

A different way to create a 'smart contract' would be to drop some high-level code into the tokens Mutable Data. Then the user can use the token like a program, by interacting with an app that looks for those kinds of SLP tokens. It's a much higher-level approach and is not dependent on Bitcoin Script in any way.