# Transaction Script Language

Bitcoin Cash uses a scripting system for transactions. The script language is a stack-based, Forth-like language that was deliberately designed to be limited in scope and executable on simple hardware. Both the locking script (encumbrance) on a UTXO and the unlocking script that spends it are written in this language.

When a transaction is validated, the unlocking script in each input is executed alongside the corresponding locking script to determine if spending conditions are met. Numbers (data constants) are pushed onto the stack, and operators act on stack items. For example, OP_ADD pops two items, adds them, and pushes the result back onto the stack.

The script language has important limitations:
- It is not Turing-complete (no loops or complex flow control)
- It is stateless (no state before or after script execution)

These limitations ensure predictable execution times and prevent malicious scripts from creating infinite loops that could attack the network.