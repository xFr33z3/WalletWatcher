/*
 * Get balance from a wallet (ETH Balance)
 */

const { ethers } = require("ethers");
require("dotenv").config({quiet: true})


const RPC_URL = process.env.RPC_URL;

const provider = new ethers.JsonRpcProvider(RPC_URL);

async function getBalance(address) {
    try {
        const balanceWei = await provider.getBalance(address);
        return ethers.formatEther(balanceWei); // Balance
    } catch (err) {
        console.error("Error in getBalance:", err);
        return null;
    }
}

module.exports = getBalance;