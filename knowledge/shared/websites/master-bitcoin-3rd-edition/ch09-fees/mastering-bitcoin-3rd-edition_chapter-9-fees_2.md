## Fee Payment Responsibility and Fee Rates

In Bitcoin, the spender typically pays the transaction fee. Unlike other payment systems where fees might be hidden, Bitcoin transaction fees require explicit permission from the spender. While it's possible for a receiver to pay a fee in a separate transaction, it's most efficient for the spender to pay the fee in the same transaction that makes the payment. This approach accommodates the technical structure of Bitcoin and matches practical expectations, as spenders often have the highest desire to see transactions confirm quickly.

Miners evaluate transactions by dividing the fee by the transaction's size (weight) to find the highest fee per weight, called the "fee rate." This is analogous to comparison shopping by price per unit. Fee rates can be expressed in different units:
- BTC/Bytes or BTC/Kilobytes (legacy units)
- BTC/Vbytes or BTC/Kilo-vbyte
- Satoshi/Vbyte (most common today)
- Satoshi/Weight (also common)

It's crucial to be careful when accepting fee rate inputs. If users mix denominations, they could overpay by factors of 1,000 or even 100,000,000 times. Wallets should make it difficult to accidentally pay excessive fees, while still allowing intentional high fees for legitimate reasons.