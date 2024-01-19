// server.js
const express = require('express');
const { Web3 }  = require('web3');
const app = express();
const port = 3001;

const web3 = new Web3("http://127.0.0.1:7545");
// console.log(web3);
// const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const contractAddress = "0x2Ff3D0b47Ef3E851a2059644ecB80B4C76fF2326";
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_data",
        type: "string",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "get",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "storedData",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]; // ABI of your deployed smart contract

const contract = new web3.eth.Contract(abi, contractAddress);
// console.log(contract);

app.use(express.json());

app.get('/api/get', async (req, res) => {
    const result = await contract.methods.get().call();
    res.json({ data: result });
});

app.post('/api/set', async (req, res) => {
    const { data } = req.body;
    await contract.methods
      .set(data)
      .send({ from: "0xc6C406aF379f7c80cE5A4f314462Ef45577Bc286" });
    res.json({ message: 'Data set successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
