/*
 * Transactions monitor
 */

const { ethers } = require("ethers");
const db = require("../db/db");
const logger = require("pino")({
    transport: {
        target: "pino-pretty"
    }
});
require("dotenv").config({quiet: true})

const RPC_URL = process.env.RPC_URL

const provider = new ethers.JsonRpcProvider(RPC_URL);

function getWatchedAddresses() {
    const rows = db.prepare("SELECT DISTINCT address FROM wallets").all();
    return rows.map(r => r.address.toLowerCase());
}

function getLastBlock() {
    const row = db.prepare("SELECT value FROM meta WHERE key = 'lastBlock'").get();
    return row ? Number(row.value) : null;
}

function setLastBlock(blockNumber) {
    const stmt = db.prepare(`
        INSERT INTO meta (key, value)
        VALUES ('lastBlock', ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `);
    stmt.run(String(blockNumber));
}

async function handleBlock(blockNumber, bot) {
    console.log("New block: " + blockNumber);

    const watched = getWatchedAddresses();
    if (watched.length === 0) return;

    const block = await provider.getBlock(blockNumber, true); // true = include tx
    if (!block || !block.transactions) return;

    for (const tx of block.transactions) {
        const from = tx.from?.toLowerCase();
        const to = tx.to?.toLowerCase();

        const involved = watched.filter(w => w === from || w === to);
        if (involved.length === 0) continue;

        const valueEth = ethers.formatEther(tx.value);

        const rows = db.prepare("SELECT userId FROM wallets WHERE address = ?").all(to || from);

        for (const row of rows) {
            await bot.telegram.sendMessage(
                row.userId,
                `🔔 New transaction\n\n` +
                `From: <code>${from}</code>\n` +
                `To: <code>${to}</code>\n` +
                `Value: <b>${valueEth} ETH</b>\n` +
                `Hash: <code>${tx.hash}</code>`,
                { parse_mode: "HTML" }
            );
        }
    }

    setLastBlock(blockNumber);
}

function startTxMonitor(bot) {
    /*
     * This function runs every time the provider emits a new block event.
     */
    provider.on("block", (blockNumber) => {
        handleBlock(blockNumber, bot).catch(console.error);
    });

    logger.info("txMonitor running...");
}

module.exports = { startTxMonitor };