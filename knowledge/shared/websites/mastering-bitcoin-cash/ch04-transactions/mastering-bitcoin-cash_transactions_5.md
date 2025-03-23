# Transaction Inputs and Outputs

Transaction outputs consist of two parts:
- An amount of Bitcoin Cash in satoshis
- A locking script that specifies the conditions required to spend the output

The structure of a transaction output is:

| Size               | Field               | Description                                                  |
| :----------------- | :------------------ | :----------------------------------------------------------- |
| 8 bytes            | Amount              | Bitcoin Cash value in satoshis (10<sup>8</sup> Bitcoin Cash) |
| 1–9 bytes (VarInt) | Locking-Script Size | Locking-Script length in bytes, to follow                    |
| Variable           | Locking-Script      | A script defining the conditions needed to spend the output  |

Transaction inputs are pointers to UTXOs that are being spent. They reference specific UTXOs by their transaction hash and sequence number in the blockchain. To spend a UTXO, the input must include an unlocking script that satisfies the conditions set by the UTXO's locking script.

The structure of a transaction input is:

| Size               | Field                 | Description                                                      |
| :----------------- | :-------------------- | :--------------------------------------------------------------- |
| 32 bytes           | Transaction Hash      | Pointer to the transaction containing the UTXO to be spent       |
| 4 bytes            | Output Index          | The index number of the UTXO to be spent; first one is 0         |
| 1-9 bytes (VarInt) | Unlocking-Script Size | Unlocking-Script length in bytes, to follow                      |
| Variable           | Unlocking-Script      | A script that fulfills the conditions of the UTXO locking script |
| 4 bytes            | Sequence Number       | Currently disabled Tx-replacement feature, set to 0xFFFFFFFF     |