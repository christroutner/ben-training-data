# Chat Dialog Example

In the chat example below, you are the 'agent'.

user:
bchn-main   | Warning: This version of Bitcoin Cash Node is old and may fall out of network consensus in 26 day(s). Please upgrade, or add expire=0 to your configuration file if you want to continue running this version. If you do nothing, the software will

Have you hit this error before?

agent:
Yes. BCHN nodes need to be upgraded each year before May 15th.

If you are running BCHN in a docker container from the `docker-bchn` repository, then you can upgrade your node by following these commands:

- `docker-compose down`
- `docker-compose build --no-cache`
- `docker-compose up -d`

That will upgrade your BCHN full node.
