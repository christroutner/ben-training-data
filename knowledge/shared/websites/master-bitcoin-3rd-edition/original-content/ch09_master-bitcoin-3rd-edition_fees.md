## Transaction Fees

<p class="fix_tracking">
The digital signature we saw Alice create in <a data-type="xref" href="#c_signatures">#c_signatures</a> only
proves that she knows her private key and that she committed to a
transaction that pays Bob.  She can create another signature that
instead commits to a transaction paying Carol—a transaction that spends
the same output (bitcoins) that she used to pay Bob.  Those two
transactions are now <em>conflicting transactions</em> because only one
transaction spending a particular output can be included in the valid
blockchain with the most proof of work—the blockchain that full nodes
use to determine which keys control which bitcoins.
</p>

To((("conflicting transactions")))((("transactions", "conflicts in"))) protect himself against conflicting transactions, it would be wise
for Bob to wait until the transaction from Alice is included in the
blockchain to a sufficient depth before he considers the money he
received as his to spend (see [confirmations](#confirmations)).
For Alice’s transaction to be included in the
blockchain, it must be included in a _block_ of transactions.  There are
a limited number of((("blocks", "transactions in")))((("transactions", "in blocks", secondary-sortas="blocks"))) blocks produced in a given amount of time, and each
block only has a limited amount of space.  Only the miner who creates
that block gets to choose which transactions to include.  Miners may
select transactions by any criteria they want, including refusing to
include any transactions at all.

<div data-type="note">
<p class="fix_tracking"> When we say "transactions" in this chapter, we refer to every
transaction in a block except for the first transaction.  The first
transaction in a block is a <em>coinbase transaction</em>, described in
<a data-type="xref" href="#coinbase_transactions">#coinbase_transactions</a>, which allows the miner of the block to
collect their reward for producing the block.  Unlike other
transactions, a coinbase transaction doesn't spend the output of a
previous transaction and is also an exception to several other rules
that apply to other transactions.  Coinbase transactions don't pay
transaction fees, don't need to be fee bumped, aren't subject to
transaction pinning, and are largely uninteresting to the following
discussion about fees—so we're going to ignore them in this chapter.
</p>
</div>

The criterion that almost all miners use to select which transactions to
include in their blocks is to maximize their revenue.  Bitcoin was
specifically designed to accommodate this by providing a mechanism that
allows a transaction to give money to the miner who includes that
transaction in a block.  We call that mechanism _transaction fees_,
although it’s not a fee in the usual sense of that word.  It’s not an
amount set by the protocol or by any particular miner--it’s much more
like a bid in an auction.  The good being purchased is the portion of
limited space in a block that a transaction will consume.  Miners choose
the set of transactions whose bids will allow them to earn the greatest
revenue.

In this chapter, we’ll explore various aspects of those
bids--transaction fees--and how they influence the creation and
management of Bitcoin transactions.

### Who Pays the Transaction Fee?

Most ((("transaction fees", "responsibility for", id="fees-responsibility")))((("payments", "transaction fees", see="transaction fees")))((("fees", see="transaction fees")))payment systems involve some sort of fee for transacting, but
often this fee is hidden from typical buyers.  For example, a merchant
may advertise the same item for the same price whether you pay with cash
or a credit card even though their payment processor may charge them
a higher fee for credit transactions than their bank charges them for
cash deposits.

In Bitcoin, every spend of bitcoins must be authenticated (typically
with a signature), so it’s not possible for a transaction to pay a fee
without the permission of the spender.  It is possible for the receiver
of a transaction to pay a fee in a different transaction--and we’ll see
that in use later--but if we want a single transaction to pay its own
fee, that fee needs to be something agreed upon by the spender.  It
can’t be hidden.

Bitcoin transactions are designed so that it doesn’t take any extra
space in a transaction for a spender to commit to the fee it pays.  That
means that, even though it’s possible to pay the fee in a different
transaction, it’s most efficient (and thus cheapest) to pay the fee in a
single transaction.

In Bitcoin,
the fee is a bid and the amount paid contributes to determining how long
it will take the transaction to confirm.  Both spenders and receivers of
a payment typically have an interest in having it confirming quickly, so
normally allowing only spenders to choose fees can sometimes be a
problem; we’ll look at a solution to that problem in [Child Pays for Parent (CPFP) Fee Bumping](#child-pays-for-parent-(cpfp)-fee-bumping).  However,
in many common payment flows, the parties with the highest desire to see a
transaction confirm quickly--that is, the parties who would be the most
willing to pay higher fees--are the spenders.

For those reasons, both technical and practical, it is customary in
Bitcoin for spenders to pay transaction fees.  There are exceptions,
such as for merchants that accept unconfirmed transactions and in
protocols that don’t immediately broadcast transactions after they are
signed (preventing the spender from being able to choose an appropriate
fee for the current market).  We’ll explore those exceptions((("transaction fees", "responsibility for", startref="fees-responsibility"))) later.

### Fees and Fee Rates

Each ((("transaction fees", "fee rates", id="fees-rates")))((("fee rates", id="fee-rate")))transaction only pays a single fee--it doesn’t matter how large the
transaction is.  However, the larger transactions become, the fewer of
them a miner will be able to fit in a block.  For that reason, miners
evaluate transactions the same way you might comparison shop between
several equivalent items at the market: they divide the price by the
quantity.

Whereas you might divide the cost of several different bags of rice by
each bag’s weight to find the lowest price per weight (best deal), miners
divide the fee of a transaction by its size (also called its weight) to
find the highest fee per weight (most revenue).  In Bitcoin, we use the
term _fee rate_ for a transaction’s size divided by weight.  Due to
changes in Bitcoin over the years, fee rate can be expressed in
different units:

* BTC/Bytes (a legacy unit rarely used anymore)
* BTC/Kilobytes (a legacy unit rarely used anymore)
* BTC/Vbytes (rarely used)
* BTC/Kilo-vbyte (used mainly in Bitcoin Core)
* Satoshi/Vbyte (most commonly used today)
* Satoshi/Weight (also commonly used today)

We recommend either the sat/vbyte or sat/weight units for displaying
fee rates.

<dl><dt><strong>⚠️ WARNING</strong></dt><dd>

Be careful ((("absurd fees")))((("excessive fees")))((("transaction fees", "overpaying")))((("overpaying transaction fees")))accepting input for fee rates.  If a user copies and pastes a
fee rate printed in one denominator into a field using a different
denominator, they could overpay fees by 1,000 times.  If they instead
switch the numerator, they could theoretically overpay by 100,000,000
times.  Wallets should make it hard for the user to pay an excessive
fee rate and may want to prompt the user to confirm any fee rate that was
not generated by the wallet itself using a trusted data source.

An excessive fee, also called an _absurd fee_, is any fee rate that’s
significantly higher than the amount that fee rate estimators currently
expect is necessary to get a transaction confirmed in the next block.
Note that wallets should not entirely prevent users from choosing an
excessive fee rate--they should only make using such a fee rate hard to do
by accident.  There are legitimate reasons for users to overpay fees on
rare occasions.
</dd></dl>

### Estimating Appropriate Fee Rates

We’ve ((("estimating fee rates", id="estimate-fee-rate")))established that you can pay a lower fee rate if you’re willing to
wait longer for your transaction to be confirmed, with the exception
that paying too low of a fee rate could result in your transaction never
confirming.  Because fee rates are bids in an open auction for block
space, it’s not possible to perfectly predict what fee rate you need to
pay to get your transaction confirmed by a certain time.  However, we
can generate a rough estimate based on what fee rates other transactions
have paid in the recent past.

A full node can record three pieces of information about each
transactions it sees: the time (block height) when it first received
that transaction, the block height when that transaction was confirmed,
and the fee rate paid by that transaction.  By grouping together
transactions that arrived at similar heights, were confirmed at similar
heights, and which paid similar fees, we can calculate how many blocks it
took to confirm transactions paying a certain fee rate.  We can then
assume that a transaction paying a similar fee rate now will take a
similar number of blocks to confirm.  Bitcoin Core includes a fee rate
estimator that uses these principles, which can be called using the
`estimatesmartfee` RPC with a parameter specifying how many blocks
you’re willing to wait before the transaction is highly likely to
confirm (for example, 144 blocks is about 1 day):

```
$ bitcoin-cli -named estimatesmartfee conf_target=144
{
  "feerate": 0.00006570,
  "blocks": 144
}
```

Many web-based services also provide fee estimation as an API.  For a
current list, see https://oreil.ly/TB6IN.

As mentioned, fee rate estimation can never be perfect.  One common
problem is that the fundamental demand might change, adjusting the
equilibrium and either increasing prices (fees) to new heights or
decreasing them toward the minimum.
If fee rates go down, then a transaction
that previously paid a normal fee rate might now be paying a high fee
rate and it will be confirmed earlier than expected.  There’s no way to
lower the fee rate on a transaction you’ve already sent, so you’re stuck
paying a higher fee rate.  But, when fee rates go up, there’s a need for
methods to be able to increase the fee rates on those transactions,
which is called _fee bumping_.  There are two commonly used types of fee
bumping in Bitcoin, replace by fee (RBF) and child pays for ((("fee rates", startref="fee-rate")))((("transaction fees", "fee rates", startref="fees-rates")))parent
(CPFP).

### Replace By Fee (RBF) Fee Bumping

To((("transaction fees", "fee bumping", "RBF (replace by fee)", id="transaction-fees-bump-rbf")))((("fee bumping", "RBF (replace by fee)", id="fee-bump-rbf")))((("RBF (replace by fee) fee bumping", id="rbf-ch9"))) increase the fee of a transaction using RBF fee bumping, you create
a conflicting version of the transaction that pays a higher fee.  Two
or more transactions are considered((("conflicting transactions")))((("transactions", "conflicts in"))) to be _conflicting transactions_ if
only one of them can be included in a valid blockchain, forcing a miner
to choose only one of them.  Conflicts occur when two or more transactions
each try to spend one of the same UTXOs, i.e., they each include an input
that has the same outpoint (reference to the output of a previous
transaction).

To prevent someone from consuming large amounts of bandwidth by creating
an unlimited number of conflicting transactions and sending them through
the network of relaying full nodes, Bitcoin Core and other full nodes
that support transaction replacement require each replacement
transaction to pay a higher fee rate than the transaction being
replaced.  Bitcoin Core also currently requires the replacement
transaction to pay a higher total fee than the original transaction, but
this requirement has undesired side effects and developers have been
looking for ways to remove it at the time of writing.

Bitcoin Core((("Bitcoin Core", "RBF variants", id="bitcoin-core-rbf"))) currently supports two variations of RBF:

* **Opt-in RBF**\
  An unconfirmed transaction can signal to miners and full nodes that
  the creator of the transaction wants to allow it to be replaced by a
  higher fee rate version.  This signal and the rules for using it
  are specified in BIP125.  As of this writing, this has been enabled by
  default in Bitcoin Core for several years.
* **Full RBF**\
  Any unconfirmed transaction can be replaced by a higher fee rate
  version.  As of this writing, this can be optionally enabled in
  Bitcoin Core (but it is disabled by default).

**Why Are There Two Variants of RBF?**

The reason for the two different versions of RBF is that full RBF has
been controversial.  Early versions of Bitcoin allowed transaction
replacement, but this behavior was disabled for several releases.  During
that time, a miner or full node using the software now called Bitcoin
Core would not replace the first version of an unconfirmed transaction
they received with any different version.  Some merchants came to expect
this behavior: they assumed that any valid unconfirmed transaction that
paid an appropriate fee rate would eventually become a confirmed
transaction, so they provided their goods or services shortly after
receiving such an unconfirmed transaction.

However, there’s no way for the Bitcoin protocol to guarantee that any
unconfirmed transaction will eventually be confirmed.  As mentioned
earlier in this chapter, every miner gets to choose for themselves which
transactions they will try to confirm--including which versions of those
transactions.  Bitcoin Core is open source software, so anyone with a
copy of its source code can add (or remove) transaction replacement.
Even if Bitcoin Core wasn’t open source, Bitcoin is an open protocol
that can be reimplemented from scratch by a sufficiently competent
programmer, allowing the reimplementor to include or not include
transaction replacement.

Transaction replacement breaks the assumption of some merchants that
every reasonable unconfirmed transaction will eventually be confirmed.
An alternative version of a transaction can pay the same outputs as the
original, but it isn’t required to pay any of those outputs.  If the
first version of an unconfirmed transaction pays a merchant, the second
version might not pay them.  If the merchant provided goods or services
based on the first version, but the second version gets confirmed, then
the merchant will not receive payment for its costs.

Some merchants, and people supporting them, requested that transaction
replacement not be reenabled in Bitcoin Core.  Other people pointed out
that transaction replacement provides benefits, including the ability to
fee bump transactions that initially paid too low of a fee rate.

Eventually, developers working on Bitcoin Core implemented a compromise:
instead of allowing every unconfirmed transaction to be replaced (full
RBF), they only programmed Bitcoin Core to allow replacement of
transactions that signaled they wanted to allow replacement (opt-in RBF).
Merchants can check the transactions they receive for the opt-in
signal and treat those transactions differently than those without the
signal.

This doesn’t change the fundamental concern: anyone can still alter
their copy of Bitcoin Core, or create a reimplementation, to allow full
RBF--and some developers even did this, but seemingly few people used
their software.

After several years, developers working on Bitcoin Core changed the
compromise slightly.  In addition to keeping opt-in RBF by default, they
added an option that allows users to enable full RBF.  If enough mining
hash rate and relaying full nodes enable this option, it will be
possible for any unconfirmed transaction to eventually be replaced by a
version paying a higher fee rate.  As of this writing, it’s not clear
whether or not that has happened ((("Bitcoin Core", "RBF variants", startref="bitcoin-core-rbf")))yet.

As a user, if you plan to use RBF fee bumping, you will first need to
choose a wallet that supports it, such as one of the wallets listed as
having "Sending support" on
https://oreil.ly/IhMzx.

As a developer, if you plan to implement RBF fee bumping, you will first
need to decide whether to perform opt-in RBF or full RBF.  At the time
of writing, opt-in RBF is the only method that’s sure to work.  Even if
full RBF becomes reliable, there will likely be several years where
replacements of opt-in transactions get confirmed slightly faster than
full-RBF replacements.  If you choose opt-in RBF, your wallet will need
to implement the signaling specified in BIP125, which is a simple
modification to any one of the sequence fields in a transaction (see
[sequence](#sequence)).  If you choose full RBF, you don’t need to include any
signaling in your transactions.  Everything else related to RBF is the
same for both approaches.

When you need to fee bump a transaction, you will simply create a new
transaction that spends at least one of the same UTXOs as the original
transaction you want to replace.  You will likely want to keep the
same outputs in the transaction that pay the receiver (or receivers).
You may pay the increased fee by reducing the value of your change
output or by adding additional inputs to the transaction.  Developers
should provide users with a fee-bumping interface that does all of this
work for them and simply asks them (or suggests to them) how much the
fee rate should be increased.

<dl><dt><strong>⚠️ WARNING</strong></dt><dd>

Be very careful when creating more than one replacement of the same
transaction.  You must ensure than all versions of the transactions
conflict with each other.  If they aren’t all conflicts, it may be
possible for multiple separate transactions to confirm, leading you to
overpay the receivers.  For example:

* Transaction version 0 includes input _A_.
* Transaction version 1 includes inputs _A_ and _B_ (e.g., you had to add
  input _B_ to pay the extra fees)
* Transaction version 2 includes inputs _B_ and _C_ (e.g., you had to add input
  _C_ to pay the extra fees but _C_ was large enough that you no longer
  need input _A_).

In this scenario, any miner who saved version 0 of the transaction
will be able to confirm both it and version 2 of the transaction.  If
both versions pay the same receivers, they’ll be paid twice (and the
miner will receive transaction fees from two separate transactions).

A simple method to avoid this problem is to ensure the replacement
transaction always includes all of the same inputs as the previous
version of the transaction.
</dd></dl>

The advantage of RBF fee bumping over other types of fee bumping is that
it can be very efficient at using block space.  Often, a replacement
transaction is the same size as the transaction it replaces.  Even when
it’s larger, it’s often the same size as the transaction the user would
have created if they had paid the increased fee rate in the first place.

The fundamental disadvantage of RBF fee bumping is that it can normally
only be performed by the creator of the transaction--the person or
people who were required to provide signatures or other authentication
data for the transaction.  An exception to this is transactions that
were designed to allow additional inputs to be added by using sighash
flags (see [sighash_types](#sighash_types)), but that presents its own challenges.  In
general, if you’re the receiver of an unconfirmed transaction and you
want to make it confirm faster (or at all), you can’t use an RBF fee
bump; you need some other method.

There are additional problems ((("transaction fees", "fee bumping", "RBF (replace by fee)", startref="transaction-fees-bump-rbf")))((("fee bumping", "RBF (replace by fee)", startref="fee-bump-rbf")))((("RBF (replace by fee) fee bumping", startref="rbf-ch9")))with RBF that we’ll explore in [Transaction Pinning](#transaction-pinning).

### Child Pays for Parent (CPFP) Fee Bumping

Anyone ((("transaction fees", "fee bumping", "CPFP (child pays for parent)", id="transaction-fees-bump-cpfp")))((("fee bumping", "CPFP (child pays for parent)", id="fee-bump-cpfp")))((("CPFP (child pays for parent) fee bumping", id="cpfp-ch9")))who receives the output of an unconfirmed transaction can
incentivize miners to confirm that transaction by spending that output.
The transaction you want to get confirmed is called the _parent
transaction_.  A transaction that spends an output of the parent
transaction is called a _child transaction_.

As we learned in [outpoints](#outpoints), every input in a confirmed transaction
must reference the unspent output of a transaction that appears earlier
in the blockchain (whether earlier in the same block or in a previous
block).  That means a miner who wants to confirm a child transaction
must also ensure that its parent transaction is confirmed.  If the
parent transaction hasn’t been confirmed yet but the child transaction
pays a high enough fee, the miner can consider whether it would be
profitable to confirm both of them in the same block.

To evaluate the profitability of mining both a parent and child
transaction, the miner looks at them as a _package of transactions_ with
an aggregate size and aggregate fees, from which the fees can be divided
by the size to calculate((("package fee rate"))) a _package fee rate_.  The miner can then sort
all of the individual transactions and transaction packages they know
about by fee rate and include the highest-revenue ones in the block
they’re attempting to mine, up to the maximum size (weight) allowed to
be included in a block.  To find even more packages that might be
profitable to mine, the miner can evaluate packages across multiple
generations (e.g., an unconfirmed parent transaction being combined with
both its child and grandchild).  This is ((("ancestor fee rate mining")))((("CPFP (child pays for parent) fee bumping", "ancestor fee rate mining")))called _ancestor fee rate
mining_.

Bitcoin Core has implemented ancestor fee rate mining for many years,
and it’s believed that almost all miners use it at the time of writing.
That means it’s practical for wallets to use this feature to fee bump an
incoming transaction by using a child transaction to pay for its parent
(CPFP).

CPFP has several advantages over RBF.  Anyone who receives an output
from a transaction can use CPFP--that includes both the receivers of
payments and the spender (if the spender included a change output).  It
also doesn’t require replacing the original transaction, which makes it
less disruptive to some merchants than RBF.

The primary disadvantage of CPFP compared to RBF is that CPFP typically
uses more block space.  In RBF, a fee bump transaction is often the same
size as the transaction it replaces.  In CPFP, a fee bump adds a whole
separate transaction.  Using extra block space requires paying extra
fees beyond the cost of the fee bump.

There are several challenges with CPFP, some of which we’ll explore in
[Transaction Pinning](#transaction-pinning).  One other problem that we
specifically need to mention is the minimum relay fee rate problem,
which is addressed by ((("transaction fees", "fee bumping", "CPFP (child pays for parent)", startref="transaction-fees-bump-cpfp")))((("fee bumping", "CPFP (child pays for parent)", startref="fee-bump-cpfp")))((("CPFP (child pays for parent) fee bumping", startref="cpfp-ch9")))package relay.

### Package Relay

Early versions((("transaction fees", "package relay", id="transaction-fee-package-relay")))((("package relay", id="package-relay"))) of Bitcoin Core didn’t place any limits on the number of
unconfirmed transactions they stored for later relay and mining in their
mempools (see [mempool](#mempool)).  Of course, computers have physical limits, whether
it’s the memory (RAM) or disk space--it’s not possible for a full node
to store an unlimited number of unconfirmed transactions.  Later
versions of Bitcoin Core limited the size of the mempool to hold about
one day’s worth of transactions, storing only the transactions or packages
with the highest fee rate.

That works extremely well for most things, but it creates a dependency
problem.  In order to calculate the fee rate for a transaction package,
we need both the parent and descendant transactions--but if the parent
transaction doesn’t pay a high enough fee rate, it won’t be kept in a
node’s mempool.  If a node receives a child transaction without having
access to its parent, it can’t do anything with that transaction.

The solution to this problem is the ability to relay transactions as a
package, called _package relay_, allowing the receiving node to evaluate
the fee rate of the entire package before operating on any individual
transaction.  As of this writing, developers working on Bitcoin Core
have made significant progress on implementing package relay, and a
limited early version of it may be available by the time this book is
published.

Package relay is especially important for protocols based on
time-sensitive presigned transactions, such as Lightning Network (LN).  In
non-cooperative cases, some presigned transactions can’t be fee bumped
using RBF, forcing them to depend on CPFP.  In those protocols, some
transactions may also be created long before they need to be broadcast,
making it effectively impossible to estimate an appropriate fee rate.
If a presigned transaction pays a fee rate below the amount necessary to
get into a node’s mempool, there’s no way to fee bump it with a child.
If that prevents the transaction from confirming in time, an honest user
might lose money.  Package relay is the solution for this critical
problem.

### Transaction Pinning

<p class="fix_tracking">
Although both RBF and CPFP fee bumping work in the basic cases we
described, there are rules related to both
methods that are designed to prevent denial-of-service attacks on miners
and relaying full nodes.  An unfortunate side effect of those rules
is that they can sometimes prevent someone from being able to use fee
bumping.  Making it impossible or difficult to fee bump a transaction is
called <em>transaction pinning</em>.</p>

One((("transaction fees", "fee bumping", "transaction pinning", id="transaction-fee-bump-pin")))((("fee bumping", "transaction pinning", id="fee-bump-pin")))((("transaction pinning", id="transaction-pin")))((("RBF (replace by fee) fee bumping", "transaction pinning", id="rbf-pin")))((("CPFP (child pays for parent) fee bumping", "transaction pinning", id="cpfp-pin"))) of the major denial of service concerns revolves around the effect of
transaction relationships.  Whenever the output of a transaction is
spent, that transaction’s identifier (txid) is referenced by the child
transaction.  However, when a transaction is replaced, the replacement
has a different txid.  If that replacement transaction gets confirmed,
none of its descendants can be included in the same blockchain.  It’s
possible to re-create and re-sign the descendant transactions, but that’s
not guaranteed to happen.  This has related but divergent implications
for RBF and CPFP:

* In the context of RBF, when Bitcoin Core accepts a replacement
  transaction, it keeps things simple by forgetting about the original
  transaction and all descendant transactions that depended on that
  original.  To ensure that it’s more profitable for miners to accept
  replacements, Bitcoin Core only accepts a replacement transaction if it
  pays more fees than all the transactions that will be forgotten.

  The downside of this approach is that Alice can create a small
  transaction that pays Bob.  Bob can then use his output to create a
  large child transaction.  If Alice then wants to replace her original
  transaction, she needs to pay a fee that’s larger than what both she and
  Bob originally paid.  For example, if Alice’s original transaction was
  about 100 vbytes and Bob’s transaction was about 100,000 vbytes, and
  they both used the same fee rate, Alice now needs to pay more than 1,000
  times as much as she originally paid in order to RBF fee bump her
  transaction.
* In the context of CPFP, any time the node considers including a
  package in a block, it must remove the transactions in that package
  from any other package it wants to consider for the same block.  For
  example, if a child transaction pays for 25 ancestors, and each of
  those ancestors has 25 other children, then including the package in
  the block requires updating approximately 625 packages (25^2^).
  Similarly, if a transaction with 25 descendants is removed from a
  node’s mempool (such as for being included in a block), and each of
  those descendants has 25 other ancestors, another 625 packages need to
  be updated.  Each time we double our parameter (e.g., from 25 to 50),
  we quadruple the amount of work our node needs to perform.

  Additionally, a transaction and all of its descendants is not
    useful to keep in a mempool long term if an alternative version of
    that transaction is mined--none of those transactions can now be
    confirmed unless there’s a rare blockchain reorganization.  Bitcoin
    Core will remove from its mempool every transaction that can no longer
    be confirmed on the current blockchain.  At it’s worst, that can
    waste an enormous amount of your node’s bandwidth and possibly be used
    to prevent transactions from propagating correctly.

  To prevent these problems, and other related
    problems, Bitcoin Core limits a parent transaction to having a maximum
    of 25 ancestors or descendants in its mempool and limits the
    total size of all those transactions to 100,000 vbytes.  The downside
    of this approach is that users are prevented from creating CPFP fee
    bumps if a transaction already has too many descendants (or if it and
    its descendants are too large).

Transaction pinning can happen by accident, but it also represents a
serious vulnerability for multiparty time-sensitive protocols such as
LN.  If your counterparty can prevent one of your
transactions from confirming by a deadline, they may be able to steal
money from you.

Protocol developers have been working on mitigating problems with
transaction pinning for several years.  One partial solution is
described in [CPFP Carve Out and Anchor Outputs](#cpfp-carve-out-and-anchor-outputs).  Several other solutions have been
proposed, and at least one solution is being actively ((("transaction fees", "fee bumping", "transaction pinning", startref="transaction-fee-bump-pin")))((("fee bumping", "transaction pinning", startref="fee-bump-pin")))((("transaction pinning", startref="transaction-pin")))((("RBF (replace by fee) fee bumping", "transaction pinning", startref="rbf-pin")))((("CPFP (child pays for parent) fee bumping", "transaction pinning", startref="cpfp-pin")))((("transaction fees", "fee bumping", "CPFP carve outs", id="transaction-fee-bump-carveout")))((("fee bumping", "CPFP carve outs", id="fee-bump-carveout")))((("carve outs (CPFP)", id="carveout")))((("CPFP (child pays for parent) fee bumping", "carve outs", id="cpfp-carveout")))developed as of
this writing&mdash;[ephemeral anchors](https://oreil.ly/300dv).

### CPFP Carve Out and Anchor Outputs

<p class="fix_tracking2">
In 2018, developers working on LN had a problem.
Their protocol uses transactions that require signatures from two
different parties.  Neither party wants to trust the other, so they sign
transactions at a point in the protocol when trust isn't needed,
allowing either of them to broadcast one of those transactions at a
later time when the other party may not want to (or be able to) fulfill
its obligations.  The problem with this approach is that the
transactions might need to be broadcast at an unknown time, far in the future, beyond any
reasonable ability to estimate an appropriate fee rate for the
transactions.</p>

In theory, the developers could have designed their transactions to
allow fee bumping with either RBF (using special sighash flags) or CPFP,
but both of those protocols are vulnerable to transaction pinning.
Given that the involved transactions are time sensitive, allowing a
counterparty to use transaction pinning to delay confirmation of a
transaction can easily lead to a repeatable exploit that malicious
parties could use to steal money from honest parties.

LN developer Matt Corallo proposed a solution: give the rules for CPFP
fee bumping a special exception, called _CPFP carve out_.  The normal
rules for CPFP forbid the inclusion of an additional descendant if it
would cause a parent transaction to have 26 or more descendants or if it
would cause a parent and all of its descendants to exceed 100,000 vbytes
in size.  Under the rules of CPFP carve out, a single additional
transaction up to 1,000 vbytes in size can be added to a package even if
it would exceed the other limits as long as it is a direct child of an
unconfirmed transaction with no unconfirmed ancestors.

<p class="fix_tracking">
For example, Bob and Mallory both co-sign a transaction with two
outputs, one to each of them.  Mallory broadcasts that transaction and
uses her output to attach either 25 child transactions or any smaller
number of child transactions equaling 100,000 vbytes in size.  Without
carve-out, Bob would be unable to attach another child transaction to
his output for CPFP fee bumping.  With carve-out, he can spend one of
the two outputs in the transaction, the one that belongs to him, as long
as his child transaction is less than 1,000 vbytes in size (which should
be more than enough space).</p>

It’s not allowed to use CPFP carve-out more than once, so it only works
for two-party protocols.  There have been proposals to extend it to
protocols involving more participants, but there hasn’t been much demand
for that and developers are focused on building more generic solutions
to transaction pinning attacks.

As of this writing, most popular LN implementations use a transaction
template called _anchor outputs_, which is designed to be used ((("anchor outputs (CPFP)")))((("transaction fees", "fee bumping", "CPFP carve outs", startref="transaction-fee-bump-carveout")))((("fee bumping", "CPFP carve outs", startref="fee-bump-carveout")))((("carve outs (CPFP)", startref="carveout")))((("CPFP (child pays for parent) fee bumping", "carve outs", startref="cpfp-carveout")))with CPFP
carve out.

### Adding Fees to Transactions

The data((("transaction fees", "change outputs and")))((("change output", "transaction fees and")))((("outputs", "transaction fees and")))((("inputs", "transaction fees and"))) structure of transactions does not have a field for fees.
Instead, fees are implied as the difference between the sum of inputs
and the sum of outputs. Any excess amount that remains after all outputs
have been deducted from all inputs is the fee that is collected by the
miners:

\begin{equation}
{Fees = Sum(Inputs) - Sum(Outputs)}
\end{equation}

This is a somewhat confusing element of transactions and an important
point to understand because if you are constructing your own
transactions, you must ensure you do not inadvertently include a very
large fee by underspending the inputs. That means that you must account
for all inputs, if necessary, by creating change, or you will end up
giving the miners a very big tip!

For example, if you spend a 20-bitcoin UTXO to make a 1-bitcoin
payment, you must include a 19-bitcoin change output back to your
wallet. Otherwise, the 19-bitcoin "leftover" will be counted as a
transaction fee and will be collected by the miner who mines your
transaction in a block. Although you will receive priority processing
and make a miner very happy, this is probably not what you intended.

<dl><dt><strong>⚠️ WARNING</strong></dt><dd>

If you forget to add a
change output in a manually constructed transaction, you will be paying
the change as a transaction fee. "Keep the change!" might not be what
you intended.
</dd></dl>

### Timelock Defense Against Fee Sniping

Fee sniping ((("transaction fees", "fee sniping", id="transaction-fee-sniping")))((("fee sniping", id="fee-snipe")))((("timelocks", "fee sniping and", id="timelock-fee-snipe")))((("lock time", "fee sniping and", id="lock-time-fee-snipe")))is a theoretical
attack scenario where miners attempting to rewrite past blocks "snipe"
higher-fee transactions from future blocks to maximize their
profitability.

For example, let’s say the highest block in existence is block
#100,000. If instead of attempting to mine block #100,001 to extend the
chain, some miners attempt to remine  #100,000. These miners can choose
to include any valid transaction (that hasn’t been mined yet) in their
candidate block  #100,000. They don’t have to remine the block with the
same transactions. In fact, they have the incentive to select the most
profitable (highest fee per kB) transactions to include in their block.
They can include any transactions that were in the "old" block
#100,000, as well as any transactions from the current mempool.
Essentially they have the option to pull transactions from the "present"
into the rewritten "past" when they re-create block  #100,000.

Today, this attack is not very lucrative because the block subsidy is much
higher than total fees per block. But at some point in the future,
transaction fees will be the majority of the reward (or even the
entirety of the reward). At that time, this scenario becomes inevitable.

Several wallets discourage fee sniping by creating transactions with a
lock time that limits those transactions to being included in the next
block or any later block. In our
scenario, our wallet would set lock time to 100,001 on any
transaction it created. Under normal circumstances, this lock time has
no effect&#x2014;the transactions could only be included in block
#100,001 anyway; it’s the next block.

But under a reorganization attack, the miners would not be able to pull
high-fee transactions from the mempool because all those transactions
would be timelocked to block #100,001. They can only remine  #100,000
with whatever transactions were valid at that time, essentially gaining
no new fees.

This does not entirely prevent fee sniping, but it does make it less
profitable in some cases and can help preserve the stability of the
Bitcoin network as the block subsidy declines.  We recommend all wallets
implement anti-fee sniping when it doesn’t interfere with the wallet’s
other uses of the lock time field.

As Bitcoin continues to mature, and as the subsidy continues to decline,
fees become more and more important to Bitcoin users, both in their
day-to-day use for getting transactions confirmed quickly and in
providing an incentive for miners to continue securing Bitcoin
transactions with new proof of work.
