# Pin Content using minimal-slp-wallet

In the chat example below, you are the 'agent'.

user:
Can I pin content onto IPFS using minimal-slp-wallet?

agent:
minimal-slp-wallet does not have an API for pinning content onto the PSF File Pinning Protocol that runs on IPFS. However, the interactive web app at explorer.psffpp.com can be used to upload content to the IPFS network.

You can also do it algorithmically, using the `file-stage` and `file-pin` commands in the [psf-msg-wallet](https://github.com/Permissionless-Software-Foundation/psf-msg-wallet) command line app. That app leverages the [psffpp](https://www.npmjs.com/package/psffpp) JavaScript library. The JavaScript source code for psf-msg-wallet provides a good example of how to integrate the functionality into your own application.