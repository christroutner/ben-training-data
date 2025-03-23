## Trustless Payment Channels with Timelocks

The simple payment channel described above has two critical vulnerabilities: if Fabian disappears, Emma's funds are locked in the 2-of-2 multisig address; and Emma could cheat by broadcasting an earlier commitment transaction that favors her. Both issues can be solved using timelocks.

To create a trustless channel, Emma first constructs both funding and refund transactions simultaneously. She signs the funding transaction but doesn't transmit it yet. Instead, she sends Fabian the refund transaction to get his signature. This refund transaction serves as the first commitment transaction with a timelock (e.g., 30 days or 4,320 blocks into the future), establishing the upper time bound for the channel.

Each subsequent commitment transaction uses a progressively shorter timelock. For example, if commitment #1 is locked until block height +4,320, commitment #2 would be locked until +4,319, and commitment #600 could be spent 600 blocks before commitment #1 becomes valid. This ensures that more recent commitments can be settled before older ones, preventing Emma from broadcasting an earlier state.

While timelocks effectively prevent cheating, they have disadvantages: they limit channel lifetime to the initial timelock period, and force a trade-off between allowing long-lived channels and making participants wait for refunds if the counterparty disappears. Additionally, the decrementing timelock creates a limit on the number of possible commitment transactions.