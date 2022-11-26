# Adeventurer

Adventurer is an on-chain RPG.

### References

- [Ethers JS Tutorial](https://youtu.be/_gdfX2mPgRc)
- [Web3JS Official Documentation](https://github.com/web3/web3.js/blob/1.x/README.md)
- [Display NFTs (Web3JS) Tutorial](https://youtu.be/7P2nnpU-HoQ)

#### Test metamask connection (web3js)
- `main()` in console; metamask should pop up to connect
- `account` in console; show your connected account address
- `contract` in console; show the contract object
    - `await contract.methods.balanceOf(account).call()` check balance of account w.r.t. the nft contract