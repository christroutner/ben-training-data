## Mining Nodes and Block Creation

Mining nodes are specialized nodes that not only receive and propagate unconfirmed transactions but also aggregate these transactions into new blocks. These nodes maintain a local copy of the blockchain and continuously collect transactions in preparation for the next block.

The first transaction in any block is a special transaction called a "coinbase transaction." This transaction is created by the miner and pays out the mining reward to their own wallet. The total reward consists of the block subsidy (newly created bitcoins) and the transaction fees from all transactions included in the block.

Unlike regular transactions, the coinbase transaction does not consume UTXOs as inputs. Instead, it has only one input (the coinbase input) that implicitly contains the block reward. To calculate the reward, the miner adds all transaction fees and the correct block subsidy based on the current block height.

The coinbase transaction also contains "coinbase data" (replacing the input script field), which must be between 2 and 100 bytes. This space can be used by miners for extra nonce values and for identifying the mining pool. As per BIP34, version-2 blocks must contain the block height as a script "push" operation at the beginning of the coinbase field.