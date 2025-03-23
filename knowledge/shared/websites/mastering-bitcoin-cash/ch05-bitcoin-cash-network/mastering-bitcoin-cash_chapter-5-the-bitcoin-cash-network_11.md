# Network Resilience and Dynamic Adaptation

The Bitcoin Cash network demonstrates remarkable resilience through its dynamic self-adjustment capabilities. If a connection shows no activity for a period, nodes periodically send messages to maintain it. When a node hasn't communicated on a connection for more than 90 minutes, it's presumed disconnected, and the node seeks a new peer. This mechanism allows the network to adjust to transient nodes and network problems, organically growing and shrinking as needed without central coordination.

Nodes typically maintain connections to multiple peers to establish diverse paths into the network. After initial bootstrapping, nodes remember their most recent successful peer connections, allowing quick reestablishment of connections after a reboot. If former peers are unresponsive, the node can use seed nodes to bootstrap again.

This peer management can be observed through the getPeerInfo command, which provides detailed information about connected peers including their address, version, connection time, and data transmission statistics:

```javascript
bchjs.Network.getPeerInfo().then(
  (result) => {
    console.log(result);
  },
  (err) => {
    console.log(err);
  }
);
```

For specialized network configurations, users can override automatic peer management with the -connect=<IPAddress> option, forcing the node to connect only to specified IP addresses instead of discovering and maintaining connections automatically.