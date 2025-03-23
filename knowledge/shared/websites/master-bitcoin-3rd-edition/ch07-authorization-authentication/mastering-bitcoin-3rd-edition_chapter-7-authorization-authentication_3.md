## The Script Execution Stack

Bitcoin's scripting language uses a data structure called a stack. The script is processed from left to right, with numbers (data constants) pushed onto the stack and operators acting on these stack values.

For example, in the script `2 3 OP_ADD 5 OP_EQUAL`:
1. Push 2 onto the stack
2. Push 3 onto the stack
3. `OP_ADD` pops the top two values (3 and 2), adds them, and pushes the result (5)
4. Push 5 onto the stack
5. `OP_EQUAL` pops two items (5 and 5), compares them, and pushes TRUE (1) if equal

Bitcoin transactions are valid when script execution ends with TRUE on top of the stack. This simple arithmetic example demonstrates how scripts can specify and verify conditions for spending outputs.