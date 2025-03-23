# Digital Signatures in Bitcoin

## Introduction to Digital Signatures

Digital signatures in Bitcoin serve three critical purposes: they prove that the controller of a private key has authorized the spending of funds, provide undeniable proof of this authorization (nonrepudiation), and ensure that the authorized transaction cannot be modified by unauthorized parties. Bitcoin currently supports two signature algorithms: the Schnorr signature algorithm and the Elliptic Curve Digital Signature Algorithm (ECDSA).

These signature algorithms are used in various contexts within Bitcoin, including spending segwit v0 P2WPKH outputs, segwit v1 P2TR keypath spending, and in script functions like OP_CHECKSIG, OP_CHECKSIGVERIFY, OP_CHECKMULTISIG, OP_CHECKMULTISIGVERIFY, and OP_CHECKSIGADD. Each transaction input and its signatures are completely independent of other inputs, allowing multiple parties to collaborate on constructing transactions while each signing only their own input.