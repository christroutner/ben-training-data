## Transaction Scripts Fundamentals

Bitcoin transactions use a programming language called Script, which is stack-based and Forth-like. Both the output script (which specifies spending conditions) and the input script (which satisfies those conditions) are written in this language.

Script is intentionally limited - it lacks loops and complex flow control capabilities, making it non-Turing Complete. This prevents potential denial-of-service attacks through infinite loops. Script is also stateless, meaning there's no state before or after execution, and all necessary information is contained within the script itself. This ensures predictable execution across all nodes in the network.

When validating a transaction, each input in a transaction is validated separately. The validation process copies the input script, retrieves the UTXO referenced by the input, and copies the output script from that UTXO. Both scripts are then executed together, with the input script needing to satisfy the output script's conditions for the transaction to be valid.