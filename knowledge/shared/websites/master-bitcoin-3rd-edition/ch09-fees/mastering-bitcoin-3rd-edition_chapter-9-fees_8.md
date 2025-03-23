## CPFP Carve Out and Anchor Outputs

Lightning Network developers faced a problem with transactions requiring signatures from two parties. These transactions might need to be broadcast at unknown future times, making fee rate estimation impossible. Both RBF and CPFP are vulnerable to transaction pinning, which could allow malicious parties to steal funds.

The solution was "CPFP carve out": an exception to CPFP rules allowing a single additional transaction up to 1,000 vbytes to be added to a package even if it exceeds normal limits, as long as it's a direct child of an unconfirmed transaction with no unconfirmed ancestors.

For example, Bob and Mallory co-sign a transaction with outputs to each of them. If Mallory broadcasts the transaction and attaches many child transactions to her output, normally Bob would be unable to attach a child transaction for CPFP fee bumping. With carve-out, he can spend his output as long as his child transaction is less than 1,000 vbytes.

CPFP carve-out works only once, making it suitable only for two-party protocols. Most popular Lightning Network implementations use "anchor outputs," a transaction template designed to work with CPFP carve out.