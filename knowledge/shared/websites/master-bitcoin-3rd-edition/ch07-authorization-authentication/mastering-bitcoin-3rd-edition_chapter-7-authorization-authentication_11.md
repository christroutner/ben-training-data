## Merklized Alternative Script Trees (MAST)

Traditional Bitcoin scripts with multiple spending conditions have several limitations: they increase transaction size, reveal all possible spending conditions, and are limited in how many conditions they can include. Merklized Alternative Script Trees (MAST) solve these issues.

MAST uses a merkle tree data structure to commit to multiple spending conditions while only revealing the one being used. Each condition (script) is hashed to create a leaf of the tree. These leaves are then paired and hashed together, repeating until a single merkle root is created.

When spending, the user only needs to provide the specific condition they're using plus the merkle proof showing it's part of the committed tree. This approach offers significant advantages:
- Reduces transaction size, especially for complex scripts
- Increases privacy by only revealing the used condition
- Enables a practically unlimited number of spending conditions
- Can be optimized to place frequently used conditions in more efficient positions

For a complex script with just 16 commitments (512 bytes), MAST could support over 32,000 different spending conditions, far more than could be used with traditional script constructs.