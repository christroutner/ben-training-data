## Lightning Network Basics

The Lightning Network (LN) is a routed network of bidirectional payment channels connected end-to-end, allowing participants to route payments through multiple channels without trusting intermediaries. First described by Joseph Poon and Thadeus Dryja in 2015, LN implementations follow interoperability standards called Basics of Lightning Technology (BOLT).

Consider five participants: Alice, Bob, Carol, Diana, and Eric, each connected by payment channels. Alice wants to pay Eric 1 bitcoin but doesn't have a direct channel with him. Instead of opening a new channel, Alice routes the payment through existing channels. The process begins with Eric generating a secret R and sending its hash H to Alice as an invoice.

Alice constructs an HTLC committing 1.003 bitcoins (including routing fees) to Bob, conditional on Bob producing the secret R within 10 blocks. Bob then creates an HTLC committing 1.002 bitcoins to Carol with a 9-block timelock. This chain continues: Carol creates an HTLC to Diana for 1.001 bitcoins with an 8-block timelock, and Diana creates an HTLC to Eric for 1 bitcoin with a 7-block timelock.

Since Eric knows the secret R, he can claim the 1 bitcoin from Diana. This reveals R to Diana, who can claim 1.001 bitcoins from Carol, and so on back through the chain. Each intermediary earns a small fee (0.001 bitcoin) for their participation. Through this mechanism, Alice successfully pays Eric without establishing a direct channel, while all participants operate without trusting each other.