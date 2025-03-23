## Advanced Address Types and Multi-Signature

Legacy Bitcoin Cash addresses beginning with "3" are pay-to-script hash (P2SH) addresses, which designate the beneficiary as the hash of a script rather than a public key owner. P2SH addresses allow for additional functionality within the address itself, requiring more than just a public key hash and private key signature to spend funds.

P2SH addresses are created by applying the same double-hash function used for regular addresses but to a script instead of a public key. The most common P2SH implementation is the multi-signature address, which requires M signatures from a total of N keys (M-of-N multi-sig) to spend funds.

For example, a 1-of-2 multi-signature address would require one signature from either of two authorized keys (like a joint bank account), while a 2-of-3 address would require at least two signatures from three possible keys. This provides enhanced security and control for business or shared funds by distributing signing authority across multiple parties.