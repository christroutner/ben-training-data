# Transaction Structure

A transaction is a data structure containing several fields that define the transfer of value:

| Size               | Field          | Description                                    |
| :----------------- | :------------- | :--------------------------------------------- |
| 4 bytes            | Version        | Specifies which rules this transaction follows |
| 1–9 bytes (VarInt) | Input Counter  | How many inputs are included                   |
| Variable           | Inputs         | One or more transaction inputs                 |
| 1–9 bytes (VarInt) | Output Counter | How many outputs are included                  |
| variable           | Outputs        | One or more transaction outputs                |
| 4 bytes            | Locktime       | A Unix timestamp or block number               |

The transaction locktime (nLockTime) defines the earliest time a transaction is valid. When set to zero, the transaction can be processed immediately. Values below 500 million are interpreted as block heights, while higher values are Unix timestamps. Transactions with future locktimes must be held until they become valid, functioning similar to a postdated check.