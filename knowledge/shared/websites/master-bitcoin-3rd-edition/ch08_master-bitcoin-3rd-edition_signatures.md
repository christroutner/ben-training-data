## Digital Signatures

Two ((("digital signatures", "schnorr signature algorithm")))((("schnorr signature algorithm")))((("digital signatures", "ECDSA")))((("ECDSA (Elliptic Curve Digital Signature Algorithm)")))((("transactions", "signatures", see="digital signatures")))signature algorithms are currently
used in Bitcoin, the _schnorr signature algorithm_ and the _Elliptic
Curve Digital Signature Algorithm_ (_ECDSA_).
These algorithms are used for digital signatures based on elliptic
curve private/public key pairs, as described in [elliptic_curve](#elliptic_curve).
They are used for spending segwit v0 P2WPKH outputs, segwit v1 P2TR
keypath spending, and by the script functions +OP_CHECKSIG+,
+OP_CHECKSIGVERIFY+, +OP_CHECKMULTISIG+, +OP_CHECKMULTISIGVERIFY+, and
+OP_CHECKSIGADD+.
Any time one of those is executed, a signature must be
provided.

A digital signature((("digital signatures", "purpose of"))) serves
three purposes in Bitcoin. First, the
signature proves that the controller of a private key, who is by
implication the owner of the funds, has _authorized_ the spending of
those funds. Secondly, the proof of authorization is _undeniable_
(nonrepudiation). Thirdly, that the authorized transaction cannot be
changed by unauthenticated third parties--that its _integrity_ is
intact.

<dl><dt><strong>📌 NOTE</strong></dt><dd>

Each transaction input and any signatures it may contain is _completely_
independent of any other input or signature. Multiple parties can
collaborate to construct transactions and sign only one input each.
Several protocols use this fact to create multiparty transactions for
privacy.
</dd></dl>

In this chapter we look at how digital signatures work and how they can
present proof of control of a private key without revealing that private
key.

### How Digital Signatures Work

A digital signature
consists of two parts. The first part is an algorithm for creating a
signature for a message (the transaction) using a private key (the
signing key). The second part is an algorithm
that allows anyone to verify the signature, given also the message and the corresponding
public key.

#### Creating a Digital Signature

In Bitcoin’s((("digital signatures", "creating"))) use of digital signature algorithms, the "message" being
signed is the transaction, or more accurately a hash of a specific
subset of the data in the transaction, ((("commitment hash")))called the _commitment hash_ (see
[Signature Hash Types (SIGHASH)](#signature-hash-types-(sighash))). The
signing key is the user’s private key. The result is the signature:

\begin{equation}
Sig = F_{sig}(F_{hash}(m), x)
\end{equation}

where:

* _x_ is the signing private key
* _m_ is the message to sign, the commitment hash (such as parts of a transaction)
* _F_~_hash_~ is the hashing function
* _F_~_sig_~ is the signing algorithm
* _Sig_ is the resulting signature

You can find more details on the mathematics of schnorr and ECDSA signatures in [Schnorr Signatures](#schnorr-signatures)
and [ECDSA Signatures](#ecdsa-signatures).

In both schnorr and ECDSA signatures, the function _F_~_sig_~ produces a signature +Sig+ that is composed of
two values.  There are differences between the two values in the
different algorithms, which we’ll explore later. After the two values
are calculated, they are serialized into a byte stream.  For ECDSA
signatures, the encoding uses an international standard encoding scheme
called the
_Distinguished Encoding Rules_, or _DER_.  For schnorr signatures, a
simpler serialization format is used.

#### Verifying the Signature

The((("digital signatures", "verifying")))((("verifying", "digital signatures"))) signature verification algorithm takes the message (a hash of parts of the transaction and related data), the signer’s public key and the signature, and returns ++TRUE++ if the signature is valid for this message and public key.

To verify the signature, one must have the signature, the serialized
transaction, some data about the output being spent, and the public key
that corresponds to the private key used to create the signature.
Essentially, verification of a signature means "Only the controller of
the private key that generated this public key could have produced this
signature on this transaction."

#### Signature Hash Types (SIGHASH)

Digital signatures((("digital signatures", "SIGHASH flags", id="digital-signature-sighash")))((("SIGHASH flags", id="sighash"))) apply to messages,
which in the case of Bitcoin, are the transactions themselves. The
signature proves a _commitment_ by the signer to specific transaction
data. In the simplest form, the signature applies to almost the entire
transaction, thereby committing to all the inputs, outputs, and other
transaction fields. However, a signature can commit to only a subset of
the data in a transaction, which is useful for a number of scenarios as
we will see in this section.

Bitcoin signatures have a way of indicating which
part of a transaction’s data is included in the hash signed by the
private key using a +SIGHASH+ flag. The +SIGHASH+ flag is a single byte
that is appended to the signature. Every signature has either an
explicit or implicit +SIGHASH+ flag,
and the flag can be different from input to input. A transaction with
three signed inputs may have three signatures with different +SIGHASH+
flags, each signature signing (committing) to different parts of the
transaction.

Remember, each input may contain one or more signatures. As
a result, an input may have signatures
with different +SIGHASH+ flags that commit to different parts of the
transaction. Note also that Bitcoin transactions
may contain inputs from different "owners," who may sign only one input
in a partially constructed transaction, collaborating with
others to gather all the necessary signatures to make a valid
transaction. Many of the +SIGHASH+ flag types only make sense if you
think of multiple participants collaborating outside the Bitcoin network
and updating a partially signed transaction.

There are three +SIGHASH+ flags: +ALL+, +NONE+, and +SINGLE+, as shown
in [sighash_types_and_their](#sighash_types_and_their).

<table id="sighash_types_and_their">
<caption>
<span class="plain"><code>SIGHASH</code></span> types and their meanings</caption>
<thead>
<tr>
<th><code>SIGHASH</code> flag</th>
<th>Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><p><code>ALL</code></p></td>
<td><p><code>0x01</code></p></td>
<td><p>Signature applies to all inputs and outputs</p></td>
</tr>
<tr>
<td><p><code>NONE</code></p></td>
<td><p><code>0x02</code></p></td>
<td><p>Signature applies to all inputs, none of the outputs</p></td>
</tr>
<tr>
<td><p><code>SINGLE</code></p></td>
<td><p><code>0x03</code></p></td>
<td><p>Signature applies to all inputs but only the one output with the same index number as the signed input</p></td>
</tr>
</tbody>
</table>

In addition, there is a modifier flag, +SIGHASH_ANYONECANPAY+, which can
be combined with each of the preceding flags. When +ANYONECANPAY+ is
set, only one input is signed, leaving the rest (and their sequence
numbers) open for modification. The +ANYONECANPAY+ has the value +0x80+
and is applied by bitwise OR, resulting in the combined flags as shown
in [sighash_types_with_modifiers](#sighash_types_with_modifiers).

<table id="sighash_types_with_modifiers">
<caption>
<span class="plain"><code>SIGHASH</code></span> types with modifiers and their meanings</caption>
<thead>
<tr>
<th><code>SIGHASH</code> flag</th>
<th>Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><p><code>ALL|ANYONECANPAY</code></p></td>
<td><p><code>0x81</code></p></td>
<td><p>Signature applies to one input and all outputs</p></td>
</tr>
<tr>
<td><p><code>NONE|ANYONECANPAY</code></p></td>
<td><p><code>0x82</code></p></td>
<td><p>Signature applies to one input, none of the outputs</p></td>
</tr>
<tr>
<td><p><code>SINGLE|ANYONECANPAY</code></p></td>
<td><p><code>0x83</code></p></td>
<td><p>Signature applies to one input and the output with the same index number</p></td>
</tr>
</tbody>
</table>

The way +SIGHASH+ flags are applied during signing and verification is
that a copy of the transaction is made and certain fields within are
either omitted or truncated (set to zero length and emptied). The resulting transaction is
serialized. The +SIGHASH+ flag is included in the serialized
transaction data and the result is hashed. The hash digest itself is the "message"
that is signed. Depending on which +SIGHASH+ flag is used, different
parts of the transaction are included.
By including the
+SIGHASH+ flag itself, the signature commits the
+SIGHASH+ type as well, so it can’t be changed (e.g., by a miner).

In
[Serialization of ECDSA Signatures (DER)](#serialization-of-ecdsa-signatures-(der)), we will see that the last part of the
DER-encoded signature was +01+, which is the +SIGHASH_ALL+ flag for ECDSA signatures. This
locks the transaction data, so Alice’s signature is committing to the state
of all inputs and outputs. This is the most common signature form.

Let’s look at some of the other +SIGHASH+ types and how they can be used
in practice:

* *+ALL|ANYONECANPAY+ *\
This ((("crowdfunding")))construction can be used to make a
"crowdfunding&#x201d;-style transaction. Someone attempting to raise
funds can construct a transaction with a single output. The single
output pays the "goal" amount to the fundraiser. Such a transaction is
obviously not valid, as it has no inputs. However, others can now amend
it by adding an input of their own as a donation. They sign their own
input with +ALL|ANYONECANPAY+. Unless enough inputs are gathered to
reach the value of the output, the transaction is invalid. Each donation
is a "pledge," which cannot be collected by the fundraiser until the
entire goal amount is raised.  Unfortunately, this protocol can be
circumvented by the fundraiser adding an input of their own (or from
someone who lends them funds), allowing them to collect the donations
even if they haven’t reached the specified value.
* *+NONE+ *\
This construction can be used to create a "bearer check" or
"blank check" of a specific amount. It commits to all inputs but allows
the outputs to be changed. Anyone can write their own
Bitcoin address into the output script.
By itself, this allows any miner to change
the output destination and claim the funds for themselves, but if other
required signatures in the transaction use +SIGHASH_ALL+ or another type
that commits to the output, it allows those spenders to change the
destination without allowing any third parties (like miners) to modify
the outputs.
* *+NONE|ANYONECANPAY+ *\
This construction can be used to build a "dust
collector." Users who have tiny UTXOs in their wallets can’t spend these
without the cost in fees exceeding the value of the UTXO; see
[uneconomical_outputs](#uneconomical_outputs). With this type
of signature, the uneconomical UTXOs can be donated for anyone to aggregate and
spend whenever they want.

There are some proposals to modify or
expand the +SIGHASH+ system.  The most widely discussed proposal as of
this writing is ((("BIP118 SIGHASH flags")))BIP118, which proposes to add two
new sighash flags.  A signature using +SIGHASH_ANYPREVOUT+ would not
commit to an input’s outpoint field, allowing it to be used to spend any
previous output for a particular witness program.  For example, if Alice
receives two outputs for the same amount to the same witness program
(e.g., requiring a single signature from her wallet), a
+SIGHASH_ANYPREVOUT+ signature for spending either one of those outputs
could be copied and used to spend the other output to the same
destination.

A signature using +SIGHASH_ANYPREVOUTANYSCRIPT+ would not
commit to the outpoint, the amount, the witness program, or the
specific leaf in the taproot merkle tree (script tree), allowing it to spend any previous output that the signature could satisfy.  For example, if Alice received two
outputs for different amounts and different witness programs (e.g., one
requiring a single signature and another requiring her signature plus some
other data), a +SIGHASH_ANYPREVOUTANYSCRIPT+ signature for spending
either one of those outputs could be copied and used to spend the other
output to the same destination (assuming the extra data for the second
output was known).

The main expected use for the two ++SIGHASH_ANYPREVOUT++ opcodes is improved
payment channels, such as those used in the Lightning Network (LN), although
several other uses have been described.

<dl><dt><strong>📌 NOTE</strong></dt><dd>

You will not often see +SIGHASH+ flags presented as an option in a user’s
wallet application.  Simple wallet applications
sign with +SIGHASH_ALL+ flags.  More sophisticated applications, such as
LN nodes, may use alternative +SIGHASH+ flags, but they
use protocols that have been extensively reviewed to understand the
influence of the alternative ((("digital signatures", "SIGHASH flags", startref="digital-signature-sighash")))((("SIGHASH flags", startref="sighash")))flags.
</dd></dl>

### Schnorr Signatures

In 1989, ((("digital signatures", "schnorr signature algorithm", id="digital-sigs-schnorr")))((("schnorr signature algorithm", id="schnorr")))Claus Schnorr published a paper describing the signature
algorithm that’s become eponymous with him.  The algorithm isn’t
specific to the elliptic curve cryptography (ECC) that Bitcoin and many
other applications use, although it is perhaps most strongly associated
with ECC today.  Schnorr signatures have a number of nice properties:

* **Provable security**\
  A mathematical ((("digital signatures", "schnorr signature algorithm", "properties of")))((("schnorr signature algorithm", "properties of")))proof of the security of schnorr signatures depends on
  only the difficulty of solving the Discrete Logarithm Problem (DLP),
  particularly for elliptic curves (EC) for Bitcoin, and the ability of
  a hash function (like the SHA256 function used in Bitcoin) to produce
  unpredictable values, called the random oracle model (ROM).  Other
  signature algorithms have additional dependencies or require much
  larger public keys or signatures for equivalent security to
  ECC-Schnorr (when the threat is defined as classical computers; other
  algorithms may provide more efficient security against quantum
  computers).
* **Linearity**\
  Schnorr signatures have a property that mathematicians ((("linearity")))call
  _linearity_, which applies to functions with two particular
  properties.  The first property is that summing together two or more
  variables and then running a function on that sum will produce the
  same value as running the function on each of the variables
  independently and then summing together the results, e.g.,
  _f(x_ + _y_ + _z)_ == _f(x)_ + _f(y)_ + _f(z)_; this property is((("additivity"))) called
  _additivity_.  The second property is that multiplying a variable and
  then running a function on that product will produce the same value as
  running the function on the variable and then multiplying it by the
  same amount, e.g., _f(a_ × _x)_ == _a_ × _f(x)_; this property is ((("homogeneity of degree 1")))called
  _homogeneity of degree 1_.

  In cryptographic operations, some functions may be private (such
    as functions involving private keys or secret nonces), so being able
    to get the same result whether performing an operation inside or
    outside of a function makes it easy for multiple parties to coordinate
    and cooperate without sharing their secrets.  We’ll see some of the
    specific benefits of linearity in schnorr signatures in
    [Schnorr-based Scriptless Multisignatures](#schnorr-based-scriptless-multisignatures) and [Schnorr-based Scriptless Threshold Signatures](#schnorr-based-scriptless-threshold-signatures).
* **Batch verification**\
  When used((("batch verification of digital signatures"))) in a certain way (which Bitcoin does), one consequence of
  schnorr’s linearity is that it’s relatively straightforward to verify
  more than one schnorr signature at the same time in less time than it
  would take to verify each signature independently.  The more
  signatures that are verified in a batch, the greater the speed up.
  For the typical number of signatures in a block, it’s possible to
  batch verify them in about half the amount of time it would take to
  verify each signature independently.

Later in this chapter, we’ll describe the schnorr signature algorithm
exactly as it’s used in Bitcoin, but we’re going to start with a
simplified version of it and work our way toward the actual protocol in
stages.

Alice((("digital signatures", "schnorr signature algorithm", "examples of usage")))((("schnorr signature algorithm", "examples of usage"))) starts by choosing a large random number (_x_), which we call her
_private key_.  She also knows a public point on Bitcoin’s elliptic
curve called the Generator (_G_) (see [public_key_derivation](#public_key_derivation)).  Alice uses EC
multiplication to multiply _G_ by her private key _x_, in which case _x_
is called a _scalar_ because it scales up _G_.  The result is _xG_,
which we call Alice’s _public key_.  Alice gives her public key to Bob.
Even though Bob also knows _G_, the DLP prevents Bob from being able to divide _xG_ by _G_ to derive Alice’s
private key.

At some later time, Bob wants Alice to identify herself by proving
that she knows the scalar _x_ for the public key (_xG_) that Bob
received earlier.  Alice can’t give Bob _x_ directly because that would
allow him to identify as her to other people, so she needs to prove
her knowledge of _x_ without revealing _x_ to Bob,((("zero-knowledge proof"))) called a
_zero-knowledge proof_.  For that, we begin the schnorr identity
process:

1. Alice chooses another large random number (_k_), which we call the
  _private nonce_.  Again she uses it as a scalar, multiplying it by _G_
  to produce _kG_, which we call the _public nonce_.  She gives the
  public nonce to Bob.
2. Bob chooses a large random number of his own, _e_, which we call the
  _challenge scalar_.  We say "challenge" because it’s used to challenge
  Alice to prove that she knows the private key (_x_) for the public key
  (_xG_) she previously gave Bob; we say "scalar" because it will later
  be used to multiply an EC point.
3. Alice now has the numbers (scalars) _x_, _k_, and _e_.  She combines
  them together to produce a final scalar _s_ using the formula
  _s_ = _k_ + _ex_.  She gives _s_ to Bob.
4. Bob now knows the scalars _s_ and _e_, but not _x_ or _k_.  However,
  Bob does know _xG_ and _kG_, and he can compute for himself _sG_ and
  _exG_.  That means he can check the equality of a scaled-up version of
  the operation Alice performed: _sG_ == _kG_ + _exG_.  If that is equal,
  then Bob can be sure that Alice knew _x_ when she generated _s_.

**Schnorr Identity Protocol with Integers Instead of Points**

It might be easier to understand the interactive schnorr identity
protocol if we create an insecure oversimplification by substituting each of the preceding values (including _G_) with simple integers instead of points on an elliptic curve.
For example, we’ll use the prime numbers starting with 3:

Setup: Alice chooses _x_ = 3 as her private key.  She multiplies it by the
generator _G_ = 5 to get her public key _xG_ = 15.  She gives Bob 15.

1. Alice chooses the private nonce _k_ = 7 and generates the public nonce
  _kG_ = 35.  She gives Bob 35.
2. Bob chooses _e_ = 11 and gives it to Alice.
3. Alice generates _s_ = 40 = 7 + 11 × 3.  She gives Bob 40.
4. Bob derives _sG_ = 200 = 40 × 5 and _exG_ = 165 = 11 × 15.  He then
  verifies that 200 == 35 + 165.  Note that this is the same operation
  that Alice performed, but all of the values have been scaled up by 5
  (the value of _G_).

Of course, this is an oversimplified example.  When working with simple
integers, we can divide products by the generator _G_ to get the
underlying scalar, which isn’t secure.  This is why a critical property
of the elliptic curve cryptography used in Bitcoin is that
multiplication is easy but division by a point on the curve is impractical.  Also, with numbers
this small, finding underlying values (or valid substitutes) through
brute force is easy; the numbers used in Bitcoin are much larger.

Let’s discuss some of the features of the interactive schnorr
identity protocol that make it secure:

* **The nonce (k)**\
In step 1, ((("digital signatures", "schnorr signature algorithm", "security features")))((("schnorr signature algorithm", "security features")))Alice chooses a number that Bob doesn’t
  know and can’t guess and gives him the scaled form of that number,
  _kG_.  At that point, Bob also already has her public key (_xG_),
  which is the scaled form of _x_, her private key.  That means when Bob is working on
  the final equation (_sG_ = _kG_ + _exG_), there are two independent
  variables that Bob doesn’t know (_x_ and _k_).  It’s possible to use
  simple algebra to solve an equation with one unknown variable but not
  two independent unknown variables, so the presence of Alice’s nonce
  prevents Bob from being able to derive her private key.  It’s critical
  to note that this protection depends on nonces being unguessable in
  any way.  If there’s anything predictable about Alice’s nonce, Bob may
  be able to leverage that into figuring out Alice’s private key.  See
  [The Importance of Randomness in Signatures](#the-importance-of-randomness-in-signatures) for more details.
* **The challenge scalar (e)**\
Bob waits to receive Alice’s public nonce
  and then proceeds in step 2 to give her a number (the challenge
  scalar) that Alice didn’t previously know and couldn’t have guessed.
  It’s critical that Bob only give her the challenge scalar after she
  commits to her public nonce.  Consider what could happen if someone
  who didn’t know _x_ wanted to impersonate Alice, and Bob accidentally
  gave them the challenge scalar _e_ before they told him the public
  nonce _kG_.  This allows the impersonator to change parameters on both sides of
  the equation that Bob will use for verification, _sG_ == _kG_ + _exG_;
  specifically, they can change both _sG_ and _kG_.  Think about a
  simplified form of that expression: _x_ = _y_ + _a_.  If you can change both
  _x_ and _y_, you can cancel out _a_ using _x_++'++ = (_x_ – _a_) + _a_.  Any
  value you choose for _x_ will now satisfy the equation.  For the
  actual equation the impersonator simply chooses a random number for _s_, generates
  _sG_, and then uses EC subtraction to select a _kG_ that equals _kG_ =
  _sG_ – _exG_.  They give Bob their calculated _kG_ and later their random
  _sG_, and Bob thinks that’s valid because _sG_ == (_sG_ – _exG_) + _exG_.
  This explains why the order of operations in the protocol is
  essential: Bob must only give Alice the challenge scalar after Alice
  has committed to her public nonce.

<p class="fix_tracking">
The interactive identity protocol described here matches part of Claus
Schnorr's original description, but it lacks two essential features we
need for the decentralized Bitcoin network.  The first of these is that
it relies on Bob waiting for Alice to commit to her public nonce and
then Bob giving her a random challenge scalar.  In Bitcoin, the spender
of every transaction needs to be authenticated by thousands of Bitcoin
full nodes—including future nodes that haven't been started yet but
whose operators will one day want to ensure the bitcoins they receive
came from a chain of transfers where every transaction was valid.  Any
Bitcoin node that is unable to communicate with Alice, today or in the
future, will be unable to authenticate her transaction and will be in
disagreement with every other node that did authenticate it.  That's not
acceptable for a consensus system like Bitcoin.  For Bitcoin to work, we
need a protocol that doesn't require interaction between Alice and each
node that wants to authenticate her.
</p>

A simple technique, known as the Fiat-Shamir transform after its
discoverers, can turn the schnorr interactive identity protocol
into a noninteractive digital signature scheme.  Recall the importance
of steps 1 and 2--including that they be performed in order.  Alice must
commit to an unpredictable nonce; Bob must give Alice an unpredictable
challenge scalar only after he has received her commitment.  Recall also
the properties of secure cryptographic hash functions we’ve used
elsewhere in this book: it will always produce the same output when
given the same input but it will produce a value indistinguishable from
random data when given a different input.

This allows Alice to choose her private nonce, derive her public nonce,
and then hash the public nonce to get the challenge scalar.  Because
Alice can’t predict the output of the hash function (the challenge), and
because it’s always the same for the same input (the nonce), this
ensures that Alice gets a random challenge even though she chooses the nonce
and hashes it herself.  We no longer need interaction from Bob.  She can
simply publish her public nonce _kG_ and the scalar _s_, and each of the
thousands of full nodes (past and future) can hash _kG_ to produce _e_,
use that to produce _exG_, and then verify _sG_ == _kG_ + _exG_.  Written
explicitly, the verification equation becomes _sG_ == _kG_ + _hash_(_kG_) × _xG_.

We need one other thing to finish converting the interactive schnorr
identity protocol into a digital signature protocol useful for
Bitcoin.  We don’t just want Alice to prove that she knows her private
key; we also want to give her the ability to commit to a message.  Specifically,
we want her to commit to the data related to the Bitcoin transaction she
wants to send.  With the Fiat-Shamir transform in place, we already
have a commitment, so we can simply have it additionally commit to the
message.  Instead of _hash_(_kG_), we now also commit to the message
_m_ using _hash_(_kG_ || _m_), where || stands for concatenation.

We’ve now defined a version of the schnorr signature protocol, but
there’s one more thing we need to do to address a Bitcoin-specific
concern.  In BIP32 key derivation, as described in
[public_child_key_derivation](#public_child_key_derivation), the algorithm for unhardened derivation
takes a public key and adds to it a nonsecret value to produce a
derived public key.  That means it’s also possible to add that
nonsecret value to a valid signature for one key to produce a signature
for a related key.  That related signature is valid but it wasn’t
authorized by the person possessing the private key, which is a major
security failure.  To protect BIP32 unhardened derivation and
also support several protocols people wanted to build on top of schnorr
signatures, Bitcoin’s version of schnorr signatures, called _BIP340
schnorr signatures for secp256k1_, also commits to the public key being
used in addition to the public nonce and the message.  That makes the
full commitment _hash_(_kG_ || _xG_ || _m_).

Now that we’ve described each part of the BIP340 schnorr signature
algorithm and explained what it does for us, we can define the protocol.
Multiplication of integers are performed _modulus p_, indicating that the
result of the operation is divided by the number _p_ (as defined in the
secp256k1 standard) and the remainder is used.  The number _p_ is very
large, but if it was 3 and the result of an operation was 5, the actual
number we would use is 2 (i.e., 5 divided by 3 has a remainder of 2).

Setup: Alice chooses a large random number (_x_) as her private key
(either directly or by using a protocol like BIP32 to deterministically
generate a private key from a large random seed value).  She uses the
parameters defined in secp256k1 (see [elliptic_curve](#elliptic_curve)) to multiply the
generator _G_ by her scalar _x_, producing _xG_ (her public key).  She
gives her public key to everyone who will later authenticate her Bitcoin
transactions (e.g., by having _xG_ included in a transaction output).  When
she’s ready to spend, she begins generating her signature:

1. Alice chooses a large random private nonce _k_ and derives the public
   nonce _kG_.
2. She chooses her message _m_ (e.g., transaction data) and generates the
   challenge scalar _e_ = _hash_(_kG_ || _xG_ || _m_).
3. She produces the scalar _s_ = _k_ + _ex_.  The two values _kG_ and _s_
   are her signature.  She gives this signature to everyone who wants to
   verify that signature; she also needs to ensure everyone receives her
   message _m_.  In Bitcoin, this is done by including her signature in
   the witness structure of her spending transaction and then relaying that
   transaction to full nodes.
4. The verifiers (e.g., full nodes) use _s_ to derive _sG_ and then
   verify that _sG_ == _kG_ + _hash_(_kG_ || _xG_ || _m_) × _xG_.  If the equation is
   valid, Alice proved that she knows her private key _x_ (without
   revealing it) and committed to the message _m_ (containing the
   transaction data).

#### Serialization of Schnorr Signatures

A schnorr signature ((("digital signatures", "schnorr signature algorithm", "serialization")))((("schnorr signature algorithm", "serialization")))((("serialization", "of schnorr signature algorithm", secondary-sortas="schnorr")))consists of two values, _kG_ and _s_.  The value
_kG_ is a point on Bitcoin’s elliptic curve (called secp256k1) and would normally be represented by two 32-byte coordinates, e.g., (_x_, _y_).
However, only the _x_ coordinate is needed, so only that value is
included.  When you see _kG_ in schnorr signatures for Bitcoin, note that it’s only that point’s _x_
coordinate.

The value _s_ is a scalar (a number meant to multiply other numbers).  For
Bitcoin’s secp256k1 curve, it can never be more than 32 bytes long.

Although both _kG_ and _s_ can sometimes be values that can be
represented with fewer than 32 bytes, it’s improbable that they’d be
much smaller than 32 bytes, so they’re serialized as two 32-byte
values (i.e., values smaller than 32 bytes have leading zeros).
They’re serialized in the order of _kG_ and then _s_, producing exactly
64 bytes.

The taproot soft fork, also called v1 segwit, introduced schnorr signatures
to Bitcoin and is the only way they are used in Bitcoin as of this writing.  When
used with either taproot keypath or scriptpath spending, a 64-byte
schnorr signature is considered to use a default signature hash (sighash)
that is +SIGHASH_ALL+.  If an alternative sighash is used, or if the
spender wants to waste space to explicitly specify +SIGHASH_ALL+, a
single additional byte is appended to the signature that specifies the
signature hash, making the signature 65 bytes.

As we’ll see, either 64 or 65 bytes is considerably more efficient that
the serialization used for ECDSA signatures described in
[Serialization of ECDSA Signatures (DER)](#serialization-of-ecdsa-signatures-(der)).

#### Schnorr-based Scriptless Multisignatures

In the((("digital signatures", "schnorr signature algorithm", "scriptless multisignatures", id="digital-sigs-schnorr-multisig")))((("schnorr signature algorithm", "scriptless multisignatures", id="schnorr-multisig")))((("scriptless multisignatures", "in schnorr signature algorithm", secondary-sortas="schnorr", id="scriptless-multi-schnorr")))((("multisignature scripts", "in schnorr signature algorithm", secondary-sortas="schnorr", id="multi-script-schnorr"))) single-signature schnorr protocol described in [Schnorr Signatures](#schnorr-signatures), Alice
uses a signature (_kG_, _s_) to publicly prove her knowledge of her
private key, which in this case we’ll call _y_.  Imagine if Bob also has
a private key (_z_) and he’s willing to work with Alice to prove that
together they know _x_ = _y_ + _z_ without either of them revealing their
private key to each other or anyone else.  Let’s go through the BIP340
schnorr signature protocol again.

<dl><dt><strong>⚠️ WARNING</strong></dt><dd>

The simple protocol we are about to describe is not secure for the
reasons we will explain shortly.  We use it only to demonstrate the
mechanics of schnorr multisignatures before describing related protocols
that are believed to be secure.
</dd></dl>

Alice and Bob need to derive the public key for _x_, which is _xG_.
Since it’s possible to use elliptic curve operations to add two EC
points together, they start by Alice deriving _yG_ and Bob deriving
_zG_.  They then add them together to create _xG_ = _yG_ + _zG_.  The point
_xG_ is ((("aggregated public keys")))((("public keys", "aggregated")))their _aggregated public key_.  To create a signature, they begin the
simple multisignature protocol:

1. They each individually choose a large random private nonce, _a_ for
   Alice and _b_ for Bob.  They also individually derive the corresponding
   public nonce _aG_ and _bG_.  Together, they produce an aggregated
   public nonce _kG_ = _aG_ + _bG_.
2. They agree on the message to sign, _m_ (e.g., a transaction), and
   each generates a copy of the challenge scalar: _e_ = _hash_(_kG_ || _xG_ || _m_).
3. Alice produces the scalar _q_ = _a_ + _ey_.  Bob produces the scalar
   _r_ = _b_ + _ez_.  They add the scalars together to produce
   _s_ = _q_ + _r_.  Their signature is the two values _kG_ and _s_.
4. The verifiers check their public key and signature using the normal
   equation: _sG_ == _kG_ + _hash_(_kG_ || _xG_ || _m_) × _xG_.

Alice and Bob have proven that they know the sum of their private keys without
either one of them revealing their private key to the other or anyone
else.  The protocol can be extended to any number of participants (e.g.,
a million people could prove they knew the sum of their million
different keys).

The preceding protocol has several security problems.  Most notable is that one
party might learn the public keys of the other parties before committing
to their own public key.  For example, Alice generates her public key
_yG_ honestly and shares it with Bob.  Bob generates his public key
using _zG_ – _yG_.  When their two keys are combined (_yG_ + _zG_ – _yG_), the
positive and negative _yG_ terms cancel out so the public key only represents
the private key for _z_ (i.e., Bob’s private key).  Now Bob can create a
valid signature without any assistance from Alice.  This is ((("key cancellation attacks")))called a
_key cancellation attack_.

There are various ways to solve the key cancellation attack.  The
simplest scheme would be to require each participant commit to their
part of the public key before sharing anything about that key with all
of the other participants.  For example, Alice and Bob each individually
hash their public keys and share their digests with each other.  When
they both have the other’s digest, they can share their keys.  They
individually check that the other’s key hashes to the previously
provided digest and then proceed with the protocol normally.  This prevents
either one of them from choosing a public key that cancels out the keys
of the other participants.  However, it’s easy to fail to implement this
scheme correctly, such as using it in a naive way with unhardened
BIP32 public key derivation.  Additionally, it adds an extra step for
communication between the participants, which may be undesirable in many
cases.  More complex schemes have been proposed that address these
shortcomings.

In addition to the key cancellation attack, there are a number of
attacks possible against ((("nonce attacks")))nonces.  Recall that the purpose of the nonce
is to prevent anyone from being able to use their knowledge of other values
in the signature verification equation to solve for your private key,
determining its value.  To effectively accomplish that, you must use a
different nonce every time you sign a different message or change other
signature parameters.  The different nonces must not be related in any
way.  For a multisignature, every participant must follow these rules or
it could compromise the security of other participants.  In addition,
cancellation and other attacks need to be prevented.  Different
protocols that accomplish these aims make different trade-offs, so
there’s no single multisignature protocol to recommend in all cases.
Instead, we’ll note three from the MuSig family of protocols:

* **MuSig**\
  Also called _MuSig1_, this protocol((("MuSig protocol"))) requires three rounds of
  communication during the signing process, making it similar to the
  process we just described.  MuSig1’s greatest advantage is its
  simplicity.
* **MuSig2**\
  This only ((("MuSig2 protocol")))requires two rounds of communication and can sometimes allow
  one of the rounds to be combined with key exchange.  This can
  significantly speed up signing for certain protocols, such as how
  scriptless multisignatures are planned to be used in the LN.  MuSig2 is specified in BIP327 (the only scriptless
  multisignature protocol that has a BIP as of this writing).
* **MuSig-DN**\
  DN stands ((("MuSig-DN protocol")))((("repeated session attacks")))for Deterministic Nonce, which eliminates as a concern a
  problem known as the _repeated session attack_.  It can’t be combined
  with key exchange and it’s significantly more complex to implement
  than MuSig or MuSig2.

For most applications, MuSig2 is the best multisignature protocol
available at the time((("digital signatures", "schnorr signature algorithm", "scriptless multisignatures", startref="digital-sigs-schnorr-multisig")))((("schnorr signature algorithm", "scriptless multisignatures", startref="schnorr-multisig")))((("scriptless multisignatures", "in schnorr signature algorithm", secondary-sortas="schnorr", startref="scriptless-multi-schnorr")))((("multisignature scripts", "in schnorr signature algorithm", secondary-sortas="schnorr", startref="multi-script-schnorr"))) of writing.

#### Schnorr-based Scriptless Threshold Signatures

Scriptless ((("digital signatures", "schnorr signature algorithm", "scriptless threshold signatures", id="digital-sigs-schnorr-threshold")))((("schnorr signature algorithm", "scriptless threshold signatures", id="schnorr-threshold")))((("scriptless threshold signatures", id="scriptless-threshold-schnorr")))((("threshold signatures", "in schnorr signature algorithm", secondary-sortas="schnorr", id="threshold-schnorr")))multisignature protocols only work for _k_-of-_k_ signing.
Everyone with a partial public key that becomes part of the aggregated
public key must contribute a partial signature and partial nonce to the
final signature.  Sometimes, though, the participants want to allow a
subset of them to sign, such as _t_-of-_k_ where a threshold (_t_) number of participants can sign for
a key constructed by _k_ participants.  That type of signature is called a
_threshold signature_.

We saw script-based threshold signatures in
[multisig](#multisig).  But just as
scriptless multisignatures save space and increase privacy compared to
scripted multisignatures, _scriptless threshold signatures_ save space and
increase privacy compared to _scripted threshold signatures_.  To anyone
not involved in the signing, a _scriptless threshold signature_ looks
like any other signature that could’ve been created by a single-sig
user or through a scriptless multisignature protocol.

Various methods are known for generating scriptless threshold
signatures, with the simplest being a slight modification of how we
created scriptless multisignatures previously.  This protocol also
depends on verifiable secret sharing (which itself depends on secure
secret sharing).

Basic secret sharing can work through simple splitting.  Alice has a
secret number that she splits into three equal-length parts and shares
with Bob, Carol, and Dan.  Those three can combine the partial numbers
they received (called _shares_) in the correct order to reconstruct
Alice’s secret.  A more sophisticated scheme would involve Alice adding
on some additional information to each share, called a correction code,
that allows any two of them to recover the number.  This scheme is not
secure because each share gives its holder partial knowledge of Alice’s
secret, making it easier for the participant to guess Alice’s secret
than a nonparticipant who didn’t have a share.

A secure secret sharing scheme prevents participants from learning
anything about the secret unless they combine the minimum threshold
number of shares.  For example, Alice can choose a threshold of
2 if she wants any two of Bob, Carol, and Dan to be able to
reconstruct her secret.  The best known secure secret sharing algorithm
is _Shamir’s Secret Sharing Scheme_, commonly abbreviated SSSS and named
after its discoverer, one of the same discoverers of the Fiat-Shamir
transform we saw in [Schnorr Signatures](#schnorr-signatures).

In some cryptographic protocols, such as the scriptless threshold signature
schemes we’re working toward, it’s critical for Bob, Carol, and Dan to
know that Alice followed her side of the protocol correctly.  They need to
know that the shares she creates all derive from the same secret, that
she used the threshold value she claims, and that she gave each one of
them a different share.  A protocol that can accomplish all of that,
and still be a secure secret sharing scheme, is a _verifiable secret
sharing scheme_.

To see how multisignatures and verifiable secret sharing work for
Alice, Bob, and Carol, imagine they each wish to receive funds that can
be spent by any two of them.  They collaborate as described in
[Schnorr-based Scriptless Multisignatures](#schnorr-based-scriptless-multisignatures) to produce a regular multisignature public
key to accept the funds (k-of-k).  Then each participant derives two
secret shares from their private key--one for each of two the other
participants. The shares allow any two of them to reconstruct the
originating partial private key for the multisignature. Each participant
distributes one of their secret shares to the other two participants,
resulting in each participant storing their own partial private key and
one share for every other participant. Subsequently, each participant
verifies the authenticity and uniqueness of the shares they received
compared to the shares given to the other participants.

Later on, when (for example) Alice and Bob want to generate a scriptless
threshold signature without Carol’s involvement, they exchange the two
shares they possess for Carol. This enables them to reconstruct Carol’s
partial private key.  Alice and Bob also have their private keys,
allowing them to create a scriptless multisignature with all three
necessary keys.

In other words, the scriptless threshold signature scheme just described
is the same as a scriptless multisignature scheme except that
a threshold number of participants have the ability to reconstruct the
partial private keys of any other participants who are unable or
unwilling to sign.

This does point to a few things to be aware about when considering a
scriptless threshold signature protocol:

* **No accountability**\
Because Alice and Bob reconstruct Carol’s partial
private key, there can be no fundamental difference between a scriptless
multisignature produced by a process that involved Carol and one that
didn’t.  Even if Alice, Bob, or Carol claim that they didn’t sign,
there’s no guaranteed way for them to prove that they didn’t
help produce the signature.  If it’s important to know which members of
the group signed, you will need to use a script.
* **Manipulation attacks**\
Imagine that Bob tells Alice that Carol is
unavailable, so they work together to reconstruct Carol’s partial
private key.  Then Bob tells Carol that Alice is unavailable, so they
work together to reconstruct Alice’s partial private key.  Now Bob has
his own partial private key plus the keys of Alice and Carol, allowing
him to spend the funds himself without their involvement.  This attack can
be addressed if all of the participants agree to only communicate using a
scheme that allows any one of them to see all of the other’s messages
(e.g., if Bob tells Alice that Carol is unavailable, Carol is able to see
that message before she begins working with Bob).  Other solutions,
possibly more robust solutions, to this problem were being researched at
the time of writing.

No scriptless threshold signature protocol has been proposed as a BIP
yet, although significant research into the subject has been performed
by multiple Bitcoin contributors and we expect peer-reviewed solutions
will become available after the publication of this((("digital signatures", "schnorr signature algorithm", startref="digital-sigs-schnorr")))((("schnorr signature algorithm", startref="schnorr")))((("digital signatures", "schnorr signature algorithm", "scriptless threshold signatures", startref="digital-sigs-schnorr-threshold")))((("schnorr signature algorithm", "scriptless threshold signatures", startref="schnorr-threshold")))((("scriptless threshold signatures", startref="scriptless-threshold-schnorr")))((("threshold signatures", "in schnorr signature algorithm", secondary-sortas="schnorr", startref="threshold-schnorr"))) book.

### ECDSA Signatures

Unfortunately ((("digital signatures", "ECDSA", id="digital-signature-ecdsa")))((("ECDSA (Elliptic Curve Digital Signature Algorithm)", id="ecdsa")))for the future development of Bitcoin and many other
applications, Claus Schnorr patented the algorithm he discovered and
prevented its use in open standards and open source software for almost
two decades.  Cryptographers in the early 1990s who were blocked from
using the schnorr signature scheme developed an alternative construction
called the _Digital Signature Algorithm_ (DSA), with a version adapted
to elliptic curves called ECDSA.

The ECDSA scheme and standardized parameters for suggested curves it could be used
with were widely implemented in cryptographic libraries by the time
development on Bitcoin began in 2007.  This was almost certainly the
reason why ECDSA was the only digital signature protocol that Bitcoin
supported from its first release version until the activation of the
taproot soft fork in 2021.  ECDSA remains supported today for all
non-taproot transactions.  Some of the differences compared to schnorr
signatures include:

* **More complex**\
  As we’ll see, ECDSA requires more operations to create or verify a
  signature than the schnorr signature protocol.  It’s not significantly
  more complex from an implementation standpoint, but that extra
  complexity makes ECDSA less flexible, less performant, and harder to
  prove secure.
* **Less provable security**\
  The interactive schnorr signature identification protocol depends only
  on the strength of the elliptic curve Discrete Logarithm Problem
  (ECDLP).  The non-interactive authentication protocol used in Bitcoin
  also relies on the random oracle model (ROM).  However, ECDSA’s extra
  complexity has prevented a complete proof of its security being
  published (to the best of our knowledge).  We are not experts in
  proving cryptographic algorithms, but it seems unlikely after 30 years
  that ECDSA will be proven to only require the same two assumptions as
  schnorr.
* **Nonlinear**\
  ECDSA signatures cannot be easily combined to create scriptless
  multisignatures or used in related advanced applications, such as
  multiparty signature adaptors.  There are workarounds for this
  problem, but they involve additional extra complexity that
  significantly slows down operations and which, in some cases, has
  resulted in software accidentally leaking private keys.

#### ECDSA Algorithm

Let’s look at the math of ECDSA.
Signatures are created by a mathematical function _F_~_sig_~
that produces a signature composed of two values.  In ECDSA, those two
values are _R_ and _s_.

The signature
algorithm first generates a private nonce (_k_) and derives from it a public
nonce (_K_).  The _R_ value of the digital signature is then the _x_
coordinate of the nonce _K_.

From there, the algorithm calculates the _s_ value of the signature.  Like we did with schnorr signatures, operations involving
integers are modulus p:

\begin{equation}
s = k^{-1} (Hash(m) + x \times R)
\end{equation}

where:

* _k_ is the private nonce
* _R_ is the _x_ coordinate of the public nonce
* _x_ is the Alice’s private key
* _m_ is the message (transaction data)

Verification is the inverse of the signature generation function, using
the _R_, _s_ values and the public key to calculate a value _K_, which
is a point on the elliptic curve (the public nonce used in
signature creation):

\begin{equation}
K = s^{-1} \times Hash(m) \times G + s^{-1} \times R \times X
\end{equation}

where:

* _R_ and _s_ are the signature values
* _X_ is Alice’s public key
* _m_ is the message (the transaction data that was signed)
* _G_ is the elliptic curve generator point

If the _x_ coordinate of the calculated point _K_ is equal to _R_, then
the verifier can conclude that the signature is valid.

<dl><dt><strong>💡 TIP</strong></dt><dd>

ECDSA is necessarily a fairly complicated piece of math; a full
explanation is beyond the scope of this book. A number of great guides
online take you through it step by step: search for "ECDSA explained."
</dd></dl>

#### Serialization of ECDSA Signatures (DER)

Let’s ((("serialization", "ECDSA signatures")))look at
the following DER-encoded signature:

```
3045022100884d142d86652a3f47ba4746ec719bbfbd040a570b1deccbb6498c75c4ae24cb02204
b9f039ff08df09cbe9f6addac960298cad530a863ea8f53982c09db8f6e381301
```

That signature is a serialized byte stream of the _R_ and _s_ values
produced by the signer to prove control of the private key authorized
to spend an output. The serialization format consists of nine elements
as follows:

* +0x30+, indicating the start of a DER sequence
* +0x45+, the length of the sequence (69 bytes)
* +0x02+, an integer value follows
* +0x21+, the length of the integer (33 bytes)
* +R+, ++00884d142d86652a3f47ba4746ec719bbfbd040a570b1deccbb6498c75c4ae24cb++
* +0x02+, another integer follows
* +0x20+, the length of the integer (32 bytes)
* +S+, ++4b9f039ff08df09cbe9f6addac960298cad530a863ea8f53982c09db8f6e3813++
* A suffix (+0x01+) indicating the type of hash((("digital signatures", "ECDSA", startref="digital-signature-ecdsa")))((("ECDSA (Elliptic Curve Digital Signature Algorithm)", startref="ecdsa"))) used (+SIGHASH_ALL+)

### The Importance of Randomness in Signatures

As we((("digital signatures", "randomness, importance of", id="digital-signature-random")))((("randomness, importance in digital signatures", id="random-digital-signature"))) saw in [Schnorr Signatures](#schnorr-signatures) and [ECDSA Signatures](#ecdsa-signatures),
the signature generation algorithm uses a random number _k_ as the basis
for a private/public nonce pair. The value of _k_ is not
important, _as long as it is random_. If signatures from the same
private key use the private nonce _k_ with different messages
(transactions), then the
signing _private key_ can be calculated by anyone. Reuse of the same
value for _k_ in a signature algorithm leads to exposure of the private
key!

<dl><dt><strong>⚠️ WARNING</strong></dt><dd>

If the same value _k_
is used in the signing algorithm on two different transactions, the
private key can be calculated and exposed to the world!
</dd></dl>

This is not just a theoretical possibility. We have seen this issue lead
to exposure of private keys in a few different implementations of
transaction-signing algorithms in Bitcoin. People have had funds stolen
because of inadvertent reuse of a _k_ value. The most common reason for
reuse of a _k_ value is an improperly initialized random-number
generator.

To avoid this
vulnerability, the industry best practice is to not generate _k_ with a
random-number generator seeded only with entropy, but instead to use a
process seeded in part with the transaction data itself plus the
private key being used to sign.
This ensures that each transaction produces a different _k_. The
industry-standard algorithm for deterministic initialization of _k_ for
ECDSA is defined in [RFC6979](https://oreil.ly/yuabl), published by
the Internet Engineering Task Force.  For schnorr signatures, BIP340
recommends a default signing algorithm.

BIP340 and RFC6979 can generate _k_ entirely deterministically, meaning the same
transaction data will always produce the same _k_.  Many wallets do this
because it makes it easy to write tests to verify their safety-critical
signing code is producing _k_ values correctly.  BIP340 and RFC6979 both also allow
including additional data in the calculation.  If that data is entropy,
then a different _k_ will be produced even if the exact same transaction
data is signed.  This can increase protection against sidechannel and
fault-injection attacks.

If you are implementing an algorithm to sign transactions in Bitcoin,
you _must_ use BIP340, RFC6979, or a similar algorithm to
ensure you generate a different _k_ for each ((("digital signatures", "randomness, importance of", startref="digital-signature-random")))((("randomness, importance in digital signatures", startref="random-digital-signature")))transaction.

### Segregated Witness's New Signing Algorithm

Signatures in((("digital signatures", "segregated witness and")))((("segregated witness (segwit)", "digital signatures and")))((("commitment hash"))) Bitcoin transactions are applied on a _commitment hash_,
which is calculated from the transaction data, locking specific parts of
the data indicating the signer’s commitment to those values. For
example, in a simple +SIGHASH_ALL+ type signature, the commitment hash
includes all inputs and outputs.

Unfortunately, the way the legacy commitment hashes were calculated introduced the
possibility that a node verifying a signature can be forced to perform
a significant number of hash computations. Specifically, the hash
operations increase roughly quadratically with respect to the number of
inputs in the transaction. An attacker could therefore create a
transaction with a very large number of signature operations, causing
the entire Bitcoin network to have to perform hundreds or thousands of
hash operations to verify the transaction.

Segwit represented an opportunity to address this problem by changing
the way the commitment hash is calculated. For segwit version 0 witness
programs, signature verification occurs using an improved commitment
hash algorithm as specified in BIP143.

The new algorithm allows the number of
hash operations to increase by a much more gradual O(n) to the number of
signature operations, reducing the opportunity to create
denial-of-service attacks with overly complex transactions.

In this chapter, we learned about schnorr and ECDSA signatures for
Bitcoin.  This explains how full nodes authenticate transactions to
ensure that only someone controlling the key to which bitcoins were
received can spend those bitcoins.  We also examined several advanced
applications of signatures, such as scriptless multisignatures and
scriptless threshold signatures that can be used to improve the
efficiency and privacy of Bitcoin.  In the past few chapters, we’ve
learned how to create transactions, how to secure them with
authorization and authentication, and how to sign them.  We will next
learn how to encourage miners to confirm them by adding fees to the
transactions we create.
