## Transaction Version

The first four bytes of a serialized Bitcoin transaction represent its version. The original transaction version was version 1 (0x01000000), which established the basic rules all Bitcoin transactions must follow.

Version 2 transactions were introduced with the BIP68 soft fork. This version adds additional constraints on the sequence field, but only for version 2 or higher transactions. Version 1 transactions remain unaffected by these new rules. BIP112, which was part of the same soft fork as BIP68, upgraded the OP_CHECKSEQUENCEVERIFY opcode to fail if used in a transaction with a version less than 2.

Version numbers are important for protecting presigned transactions. When someone signs a transaction without broadcasting it immediately (as happens in protocols like Lightning Network), they rely on that transaction being valid when it's eventually broadcast. By only applying new constraints to newer version numbers, Bitcoin upgrades can avoid invalidating these presigned transactions. Anyone creating presigned transactions should ensure they don't use features reserved for future upgrades.