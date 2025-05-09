## Bitcoin Security

Securing your bitcoins is challenging because bitcoins are
are not like a balance in a bank account. Your bitcoins are very
much like digital cash or gold. You’ve probably heard the expression,
"Possession is nine-tenths of the law." Well, in Bitcoin, possession is
ten-tenths of the law. Possession of the keys to spend certain bitcoins is
equivalent to possession of cash or a chunk of precious metal. You can
lose it, misplace it, have it stolen, or accidentally give the wrong
amount to someone. In every one of these cases, users have no recourse
within the protocol, just as if they dropped cash on a public sidewalk.

However, the Bitcoin system has capabilities that cash, gold, and bank accounts do
not. A Bitcoin wallet, containing your keys, can be backed up like any
file. It can be stored in multiple copies, even printed on paper for
hard-copy backup. You can’t "back up" cash, gold, or bank accounts.
Bitcoin is different enough from anything that has come before that we
need to think about securing our bitcoins in a novel way too.

### Security Principles

The ((("Bitcoin", "security", "principles of", id="bitcoin-security-principle")))((("security", "principles of", id="security-principle")))((("decentralized consensus", "as security principle", secondary-sortas="security principle", id="decentral-consensus-principle")))core principle in Bitcoin is
decentralization and it has important implications for security. A
centralized model, such as a traditional bank or payment network,
depends on access control and vetting to keep bad actors out of the
system. By comparison, a decentralized system like Bitcoin pushes the
responsibility and control to the users. Because the security of the network
is based on independent verification, the network can be open
and no encryption is required for Bitcoin traffic (although encryption
can still be useful).

On a traditional payment network, such as a credit card system, the
payment is open-ended because it contains the user’s private identifier
(the credit card number). After the initial charge, anyone with access
to the identifier can "pull" funds and charge the owner again and again.
Thus, the payment network has to be secured end-to-end with encryption
and must ensure that no eavesdroppers or intermediaries can compromise
the payment traffic in transit or when it is stored (at rest). If a bad
actor gains access to the system, he can compromise current transactions
_and_ payment tokens that can be used to create new transactions. Worse,
when customer data is compromised, the customers are exposed to identity
theft and must take action to prevent fraudulent use of the compromised
accounts.

Bitcoin is dramatically different. A Bitcoin transaction authorizes only
a specific value to a specific recipient and cannot be forged.
It does not reveal any private information, such as the
identities of the parties, and cannot be used to authorize additional
payments. Therefore, a Bitcoin payment network does not need to be
encrypted or protected from eavesdropping. In fact, you can broadcast
Bitcoin transactions over an open public channel, such as unsecured WiFi
or Bluetooth, with no loss of security.

Bitcoin’s decentralized security model puts a lot of power in the hands
of the users. With that power comes responsibility for maintaining the
secrecy of their keys. For most users that is not easy to do, especially
on general-purpose computing devices such as internet-connected
smartphones or laptops. Although Bitcoin’s decentralized model prevents
the type of mass compromise seen with credit cards, many users are not
able to adequately secure their keys and get hacked, one by one.

#### Developing Bitcoin Systems Securely

A critical principle
for Bitcoin developers is decentralization. Most developers will be
familiar with centralized security models and might be tempted to apply
these models to their Bitcoin applications, with disastrous results.

Bitcoin’s security relies on decentralized control over keys and on
independent transaction validation by users. If you want to leverage
Bitcoin’s security, you need to ensure that you remain within the
Bitcoin security model. In simple terms: don’t take control of keys away
from users and don’t outsource validation.

For example, many early Bitcoin exchanges concentrated all user funds in
a single "hot" wallet with keys stored on a single server. Such a design
removes control from users and centralizes control over keys in a single
system. Many such systems have been hacked, with disastrous consequences
for their customers.

Unless you are prepared to invest heavily in operational security,
multiple layers of access control, and audits (as the traditional banks
do), you should think very carefully before taking funds outside of
Bitcoin’s decentralized security context. Even if you have the funds and
discipline to implement a robust security model, such a design merely
replicates the fragile model of traditional financial networks, plagued
by identity theft, corruption, and embezzlement. To take advantage of
Bitcoin’s unique decentralized security model, you have to avoid the
temptation of centralized architectures that might feel familiar but
ultimately subvert Bitcoin’s ((("decentralized consensus", "as security principle", secondary-sortas="security principle", startref="decentral-consensus-principle")))security.

#### The Root of Trust

Traditional ((("root of trust", id="root-trust")))security architecture is based
upon a concept called the _root of trust_, which is a trusted core used
as the foundation for the security of the overall system or application.
Security architecture is developed around the root of trust as a series
of concentric circles, like layers in an onion, extending trust outward
from the center. Each layer builds upon the more-trusted inner layer
using access controls, digital signatures, encryption, and other
security primitives. As software systems become more complex, they are
more likely to contain bugs, which make them vulnerable to security
compromise. As a result, the more complex a software system becomes, the
harder it is to secure. The root of trust concept ensures that most of
the trust is placed within the least complex part of the system, and
therefore the least vulnerable parts of the system, while more complex
software is layered around it. This security architecture is repeated at
different scales, first establishing a root of trust within the hardware
of a single system, then extending that root of trust through the
operating system to higher-level system services, and finally across
many servers layered in concentric circles of diminishing trust.

Bitcoin security
architecture is different. In Bitcoin, the consensus system creates a
trusted blockchain that is completely decentralized. A correctly
validated blockchain uses the genesis block as the root of trust,
building a chain of trust up to the current block. Bitcoin systems can
and should use the blockchain as their root of trust. When designing a
complex Bitcoin application that consists of services on many different
systems, you should carefully examine the security architecture in order
to ascertain where trust is being placed. Ultimately, the only thing
that should be explicitly trusted is a fully validated blockchain. If
your application explicitly or implicitly vests trust in anything but
the blockchain, that should be a source of concern because it introduces
vulnerability. A good method to evaluate the security architecture of
your application is to consider each individual component and evaluate a
hypothetical scenario where that component is completely compromised and
under the control of a malicious actor. Take each component of your
application, in turn, and assess the impacts on the overall security if
that component is compromised. If your application is no longer secure
when components are compromised, that shows you have misplaced trust in
those components. A Bitcoin application without vulnerabilities should
be vulnerable only to a compromise of the Bitcoin consensus mechanism,
meaning that its root of trust is based on the strongest part of the
Bitcoin security architecture.

The numerous examples of hacked Bitcoin exchanges serve to underscore
this point because their security architecture and design fails even
under the most casual scrutiny. These centralized implementations had
invested trust explicitly in numerous components outside the Bitcoin
blockchain, such as hot wallets, centralized databases,
vulnerable encryption keys, and ((("Bitcoin", "security", "principles of", startref="bitcoin-security-principle")))((("security", "principles of", startref="security-principle")))((("root of trust", startref="root-trust")))similar schemes.

### User Security Best Practices

Humans ((("Bitcoin", "security", "best practices", id="bitcoin-security-best-practice")))((("security", "best practices", id="security-best-practice")))((("best practices, security", id="best-practice-security")))have
used physical security controls for thousands of years. By comparison,
our experience with digital security is less than 50 years old. Modern
general-purpose operating systems are not very secure and not
particularly suited to storing digital money. Our computers are
constantly exposed to external threats via always-on internet
connections. They run thousands of software components from hundreds of
authors, often with unconstrained access to the user’s files. A single
piece of rogue software, among the many thousands installed on your
computer, can compromise your keyboard and files, stealing any bitcoins
stored in wallet applications. The level of computer maintenance
required to keep a computer virus-free and trojan-free is beyond the
skill level of all but a tiny minority of computer users.

Despite decades of research and advancements in information security,
digital assets are still woefully vulnerable to a determined adversary.
Even the most highly protected and restricted systems, in financial
services companies, intelligence agencies, and defense contractors, are
frequently breached. Bitcoin creates digital assets that have intrinsic
value and can be stolen and diverted to new owners instantly and
irrevocably. This creates a massive incentive for hackers. Until now,
hackers had to convert identity information or account tokens—such as
credit cards and bank accounts—into value after compromising them.
Despite the difficulty of fencing and laundering financial information,
we have seen ever-escalating thefts. Bitcoin escalates this problem
because it doesn’t need to be fenced or laundered; bitcoins are valuable
by themselves.

Bitcoin also creates the incentives to improve computer
security. Whereas previously the risk of computer compromise was vague
and indirect, Bitcoin makes these risks clear and obvious. Holding
bitcoins on a computer serves to focus the user’s mind on the need for
improved computer security. As a direct result of the proliferation and
increased adoption of Bitcoin and other digital currencies, we have seen
an escalation in both hacking techniques and security solutions. In
simple terms, hackers now have a very juicy target and users have a
clear incentive to defend themselves.

Over the past three years, as a direct result of Bitcoin adoption, we
have seen tremendous innovation in the realm of information security in
the form of hardware encryption, key storage and hardware signing devices,
multisignature technology, and digital escrow. In the following sections
we will examine various best practices for practical user security.

#### Physical Bitcoin Storage

Because most ((("bitcoins", "physical storage")))((("physical bitcoin storage")))((("storing bitcoins", id="storing-bitcoin")))users are far more
comfortable with physical security than information security, a very
effective method for protecting bitcoins is to convert them into physical
form. Bitcoin keys, and the seeds used to create them, are nothing more than long numbers. This means that
they can be stored in a physical form, such as printed on paper or
etched on a metal plate. Securing the keys then becomes as simple as
physically securing a printed copy of the key seed. A seed
that is printed on paper is called a "paper backup," and
many wallets can create them.
Keeping bitcoins
offline is ((("cold storage")))called _cold storage_ and it is one of the most effective
security techniques. A cold storage system is one where the keys are
generated on an offline system (one never connected to the internet) and
stored offline either on paper or on digital media, such as a USB memory
stick.

#### Hardware Signing Devices

In the ((("hardware signing devices")))long term, Bitcoin security may increasingly take the
form of tamper-proof hardware signing devices. Unlike a smartphone or desktop
computer, a Bitcoin hardware signing device only needs to hold keys and
use them to generate signatures.  Without general-purpose software to
compromise and
with limited interfaces, hardware signing devices can deliver strong
security to nonexpert users. Hardware
signing devices may become the predominant method of storing bitcoins.

#### Ensuring Your Access

Although
most users ((("backing up", "importance of")))are rightly concerned about theft of their bitcoins, there is an even
bigger risk. Data files get lost all the time. If they contain Bitcoin keys,
the loss is much more painful. In the effort to secure their Bitcoin
wallets, users must be very careful not to go too far and end up losing
their bitcoins. In July 2011, a well-known Bitcoin awareness and education
project lost almost 7,000 bitcoin. In their effort to prevent theft, the
owners had implemented a complex series of encrypted backups. In the end
they accidentally lost the encryption keys, making the backups worthless
and losing a fortune. Like hiding money by burying it in the desert, if
you secure your bitcoins too well you might not be able to find them again.

<dl><dt><strong>⚠️ WARNING</strong></dt><dd>

To spend bitcoins, you may((("wallets", "recovery codes")))((("recovery codes"))) need to back up more than just your private
keys or the BIP32 seed used to derive them.  This is especially the case
when multisignatures or complex scripts are being used.  Most output
scripts commit to the actual conditions that must be fulfilled to spend
the bitcoins in that output, and it’s not possible to fulfill that
commitment unless your wallet software can reveal those conditions to
the network.  Wallet recovery codes must include this information.  For
more details, see [ch05_wallets](#ch05_wallets).
</dd></dl>

#### Diversifying Risk

Would you((("risk diversification")))((("storing bitcoins", startref="storing-bitcoin"))) carry your entire net worth in cash in your wallet? Most
people would consider that reckless, yet Bitcoin users often keep all
their bitcoins using a single wallet application. Instead, users should spread the risk
among multiple and diverse Bitcoin applications. Prudent users will keep only
a small fraction, perhaps less than 5%, of their bitcoins in an online or
mobile wallet as "pocket change." The rest should be split between a few
different storage mechanisms, such as a desktop wallet and offline (cold
storage).

#### Multisig and Governance

Whenever a ((("multisignature addresses")))((("addresses", "multisignature")))company or individual stores large amounts of
bitcoins, they should consider using a multisignature Bitcoin address.
Multisignature addresses secure funds by requiring more than one
signature to make a payment. The signing keys should be stored in a
number of different locations and under the control of different people.
In a corporate environment, for example, the keys should be generated
independently and held by several company executives to ensure that no
single person can compromise the funds. Multisignature addresses can
also offer redundancy, where a single person holds several keys that are
stored in different locations.

#### Survivability

One important
security ((("survivability (of bitcoin access)")))((("estate planning")))consideration that is often overlooked is availability,
especially in the context of incapacity or death of the key holder.
Bitcoin users are told to use complex passwords and keep their keys
secure and private, not sharing them with anyone. Unfortunately, that
practice makes it almost impossible for the user’s family to recover any
funds if the user is not available to unlock them. In most cases, in
fact, the families of Bitcoin users might be completely unaware of the
existence of the bitcoin funds.

If you have a lot of bitcoins, you should consider sharing access details
with a trusted relative or lawyer. A more complex survivability scheme
can be set up with multisignature access and estate planning through a
lawyer specialized as a "digital asset executor."

Bitcoin is a complex new technology that is still being explored by developers. Over
time we will develop better security tools and practices that are easier
to use by nonexperts. For now, Bitcoin users can use many of the tips
discussed here to enjoy a secure and trouble-free Bitcoin ((("Bitcoin", "security", "best practices", startref="bitcoin-security-best-practice")))((("security", "best practices", startref="security-best-practice")))((("best practices, security", startref="best-practice-security")))experience.
