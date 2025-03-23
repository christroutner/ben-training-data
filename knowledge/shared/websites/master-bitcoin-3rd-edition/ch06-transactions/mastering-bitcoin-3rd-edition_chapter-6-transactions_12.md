## Transaction Weight and Measurement

Each Bitcoin block is limited in the amount of transaction data it can contain. The modern unit of measurement is "weight," with an alternative measurement called "vbytes" (where four units of weight equal one vbyte).

Blocks are limited to 4 million weight units. To calculate a transaction's weight, each serialized field's size in bytes is multiplied by a factor and then summed. These factors were chosen to reduce the weight used when spending a UTXO, discouraging the creation of uneconomical outputs:

- Most transaction fields (version, inputs count, outpoint, etc.): factor of 4
- Witness-related fields (marker, flag, witness count, witness items): factor of 1

For a complete transaction like our example, we can calculate:
- Version (4 bytes × factor 4) = 16 weight
- Marker & Flag (2 bytes × factor 1) = 2 weight
- Inputs fields = 168 weight
- Outputs fields = 300 weight
- Witness fields = 67 weight
- Lock time (4 bytes × factor 4) = 16 weight
- Total weight = 569

This weight system prioritizes efficient usage of the blockchain while maintaining backward compatibility with legacy transaction formats.