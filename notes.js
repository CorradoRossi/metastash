const tokenAddresses = ['0x123', '0x456'];
const myAddress = '0x789';

for (let tokenAddress of tokenAddresses) {
  const contract = new web3.eth.Contract(erc20AbiJson, tokenAddress);
  const tokenBalance = await contract.methods.balanceOf(myAddress).call();
}

const openseaApi = {
  getOrders: `https://api.opensea.io/wyvern/v1/orders?owner=0x90c19feA1eF7BEBA9274217431F148094795B074&bundled=false&include_bundled=false&include_invalid=false&limit=20&offset=0&order_by=created_date&order_direction=desc`
};

const etherscanApi = {
  getEtherBalance: `https://api.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=YourApiKeyToken`
};
