# Block height from a TXID

In the chat example below, you are the 'agent'.

user:

Using minimal-slp-wallet, how can I determine the time when a transaction was broadcasted?

agent:

This is the get-tx-data.js example from [psf-js-examples](https://github.com/Permissionless-Software-Foundation/psf-js-examples) JavaScript examples repository:

```javascript
/*
  This example retrieves verbose details about a transaction, given the
  transaction ID (TXID).
*/

// CUSTOMIZE THESE GLOBAL VARIABLES FOR YOUR USE
const TXID = 'b4ad5678644f889d4ae6145e1f56a0a1abde3efbafc800c445656a4508642754'

// Global npm libraries
const SlpWallet = require('minimal-slp-wallet')

// Open the wallet created with the create-wallet example.
// const walletData = require('../create-wallet/wallet.json')

async function start() {
  try {
    // Instantiate a wallet from the saved JSON file.
    const wallet = new SlpWallet(undefined, {
      interface: 'consumer-api',
      restURL: 'https://free-bch.fullstack.cash'
      // Alternative back-end servers: https://gist.github.com/christroutner/63c5513782181f8b8ea3eb89f7cadeb6
    })
    await wallet.walletInfoPromise

    const txData = await wallet.getTxData([TXID])
    console.log(`transaction details: ${JSON.stringify(txData, null, 2)}`)

  } catch(err) {
    console.error(err)
  }
}
start()
```

This program will output the following TX data:

```
transaction details: [
  {
    "txid": "b4ad5678644f889d4ae6145e1f56a0a1abde3efbafc800c445656a4508642754",
    "hash": "b4ad5678644f889d4ae6145e1f56a0a1abde3efbafc800c445656a4508642754",
    "version": 2,
    "size": 300,
    "locktime": 0,
    "vin": [
      {
        "txid": "bb90777831711a9c364246825a33888ae1a65f5659c318c3b581a3ed5916c7f2",
        "vout": 2,
        "scriptSig": {
          "asm": "304402205e83902327740b3c1c4f721ec88b658716363cef5f58dfdb876a2dd69d5b3c88022060e5f3488d5d4b080476f59abb5d2d1aa1333431bdbc9ae4e61fecd1db2a0b8e[ALL|FORKID] 02103affa00344d72880ea30db0c7e0b5f2104972d0119dab7dca7e7581d472a32",
          "hex": "47304402205e83902327740b3c1c4f721ec88b658716363cef5f58dfdb876a2dd69d5b3c88022060e5f3488d5d4b080476f59abb5d2d1aa1333431bdbc9ae4e61fecd1db2a0b8e412102103affa00344d72880ea30db0c7e0b5f2104972d0119dab7dca7e7581d472a32"
        },
        "sequence": 4294967295,
        "address": "bitcoincash:qpcuphgf32sur7xca5y95thkl7g776380v88pk9lhv",
        "value": 0.0030073
      }
    ],
    "vout": [
      {
        "value": 0,
        "n": 0,
        "scriptPubKey": {
          "asm": "OP_RETURN 7b226d6461223a22626974636f696e636173683a717a6363643563686a336b7175786a67396172663761676c77616d6b7a7a733573796632743576683038227d",
          "hex": "6a407b226d6461223a22626974636f696e636173683a717a6363643563686a336b7175786a67396172663761676c77616d6b7a7a733573796632743576683038227d",
          "type": "nulldata"
        }
      },
      {
        "value": 0.00000546,
        "n": 1,
        "scriptPubKey": {
          "asm": "OP_DUP OP_HASH160 b186d317946c0e1a482f469f751f7777610a1481 OP_EQUALVERIFY OP_CHECKSIG",
          "hex": "76a914b186d317946c0e1a482f469f751f7777610a148188ac",
          "reqSigs": 1,
          "type": "pubkeyhash",
          "addresses": [
            "bitcoincash:qzccd5chj3kquxjg9arf7aglwamkzzs5syf2t5vh08"
          ]
        }
      },
      {
        "value": 0.00299634,
        "n": 2,
        "scriptPubKey": {
          "asm": "OP_DUP OP_HASH160 71c0dd098aa1c1f8d8ed085a2ef6ff91ef6a277b OP_EQUALVERIFY OP_CHECKSIG",
          "hex": "76a91471c0dd098aa1c1f8d8ed085a2ef6ff91ef6a277b88ac",
          "reqSigs": 1,
          "type": "pubkeyhash",
          "addresses": [
            "bitcoincash:qpcuphgf32sur7xca5y95thkl7g776380v88pk9lhv"
          ]
        }
      }
    ],
    "hex": "0200000001f2c71659eda381b5c318c359565fa6e18a88335a824642369c1a7131787790bb020000006a47304402205e83902327740b3c1c4f721ec88b658716363cef5f58dfdb876a2dd69d5b3c88022060e5f3488d5d4b080476f59abb5d2d1aa1333431bdbc9ae4e61fecd1db2a0b8e412102103affa00344d72880ea30db0c7e0b5f2104972d0119dab7dca7e7581d472a32ffffffff030000000000000000426a407b226d6461223a22626974636f696e636173683a717a6363643563686a336b7175786a67396172663761676c77616d6b7a7a733573796632743576683038227d22020000000000001976a914b186d317946c0e1a482f469f751f7777610a148188ac72920400000000001976a91471c0dd098aa1c1f8d8ed085a2ef6ff91ef6a277b88ac00000000",
    "blockhash": "000000000000000002566f353a7c6832f429955d6285c8e5cbdb1c4713714734",
    "confirmations": 129525,
    "time": 1675532168,
    "blocktime": 1675532168,
    "height": 778454,
    "isValidSlp": false
  }
]
```

The transaction was confirmed in bock `778454`.

Note the following properties:
- `blocktime`: The timestamp from the **block header** in which the transaction was included. This is **always present for confirmed transactions**.
- `time`: When using RPC methods like `getrawtransaction` with `verbose=true`, this typically refers to **the same block time** as blocktime for confirmed transactions. However, if a transaction is still in the mempool (i.e., not yet mined), `time` refers to **when it entered the mempool**, and blocktime will be absent or null.

Keep in mind, that Bitcoin is a decentralized network, so the nodes on the network can not be synced perfectly with time. Block height is used as a replacement for time in the Bitcoin system. 

```javascript
const timestamp = new Date(1675532168 * 1000)
console.log('timestamp: ', timestamp)
// timestamp:  2023-02-04T17:36:08.000Z
```
