## Transaction Construction Process

Creating a Bitcoin Cash transaction begins with finding appropriate unspent transaction outputs (UTXOs) to serve as inputs. Wallet applications typically maintain a database of UTXOs associated with their keys. If not, they can query the network through APIs to retrieve this information. For example, using a REST API:

```bash
$ curl https://bchn.fullstack.cash/v5/electrumx/utxos/bitcoincash:qr69kyzha07dcecrsvjwsj4s6slnlq4r8c30lxnur3
```

This returns available unspent outputs:

```json
[
  "success": true,
  "utxos": [
    {
      "height": 603416,
      "tx_hash": "eef683d236d88e978bd406419f144057af3fe1b62ef59162941c1a9f05ded62c",
      "tx_pos": 0,
      "value": 1000
    },
    {
      "height": 646894,
      "tx_hash": "4c695fae636f3e8e2edc571d11756b880ccaae744390f3950d798ce7b5e25754",
      "tx_pos": 0,
      "value": 600
    }
  ]
]
```

After selecting inputs, the wallet creates outputs that encode spending conditions. Each output contains a script that encumbers the value, typically requiring a signature from the recipient's private key to spend it. The transaction must also account for change when the input value exceeds the payment amount. If the sum of outputs is less than the sum of inputs, the difference becomes the transaction fee, incentivizing miners to include the transaction in a block.