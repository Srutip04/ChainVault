// server.js
const express = require('express');
const Web3 = require('web3');
const app = express();
const port = 3001;

const web3 = new Web3('YOUR_ETH_NODE_URL');
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const abi = [...]; // ABI of your deployed smart contract

const contract = new web3.eth.Contract(abi, contractAddress);

app.use(express.json());

app.get('/api/get', async (req, res) => {
    const result = await contract.methods.get().call();
    res.json({ data: result });
});

app.post('/api/set', async (req, res) => {
    const { data } = req.body;
    await contract.methods.set(data).send({ from: 'YOUR_WALLET_ADDRESS' });
    res.json({ message: 'Data set successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
