# WalletWatcher

A real-time Ethereum wallet monitoring bot for Telegram.  
Users can track multiple wallet addresses, check balances, and receive instant transaction alerts.

Built with **Node.js**, **Telegraf**, **ethers.js**, and **SQLite (better-sqlite3)**.

---

## 🚀 Features

### 🧭 Wallet Tracking
- `/add <address>` — Add an Ethereum wallet to your watchlist
- `/list` — View your tracked wallets
- `/remove <address>` — Remove a tracked wallet

### 💰 Balance Lookup
- `/watch <address>` — Retrieve the current ETH balance of any wallet

### ⚡ Real-Time Transaction Monitoring
The bot monitors the Ethereum blockchain in real time using:
- `provider.on("block")`
- `getBlock(blockNumber, true)` to fetch full transaction lists
- automatic matching of user-tracked addresses
- instant Telegram notifications for:
    - incoming ETH transfers
    - outgoing ETH transfers

### 🗄 Persistent Storage
- Each user has their own watchlist
- SQLite-based database (`better-sqlite3`)
- Efficient CRUD helpers in `db/wallets.js`
- Metadata stored in the `meta` table (e.g., last processed block)

### 🧩 Modular Architecture

```
bot/
  commands/
db/
  db.js
  wallets.js
jobs/
  txMonitor.js
utils/
  getBalance.js
index.js
```

---

## 📦 Tech Stack

- **Node.js**
- **Telegraf** (Telegram Bot API)
- **ethers.js** (Web3 interaction)
- **better-sqlite3** (database)
- **dotenv**
- **Pino** (structured logging)

---

## 🛠 Installation

```bash
git clone https://github.com/<yourname>/WalletWatcher
cd WalletWatcher
npm install
```

---

## 🔧 Configuration

Create a `.env` file:

```
BOT_TOKEN=your_telegram_bot_token
RPC_URL=https://your-ethereum-node
```

(Use Alchemy, Infura, or any Ethereum RPC provider.)

---

## ▶ Running the Bot

```bash
npm start
```

or:

```bash
node index.js
```

---

## 💬 Telegram Commands

| Command | Description |
|--------|-------------|
| `/start` | Initialize interaction |
| `/add <wallet>` | Add wallet to watchlist |
| `/list` | Show tracked wallets |
| `/remove <wallet>` | Remove wallet |
| `/watch <wallet>` | Show ETH balance |

---

## 📡 How Transaction Monitoring Works

1. `txMonitor.js` subscribes to new blocks:
   ```js
   provider.on("block", handleBlock)
   ```
2. For each block, the bot:
    - fetches all transactions
    - compares `from` / `to` with stored addresses
    - notifies matching users via Telegram
3. Last processed block is saved in the SQLite `meta` table to ensure continuity after restarts.

---

## 🧭 Roadmap

- ERC20 token transfer monitoring
- CSV export of transaction history
- Web dashboard (Next.js or Express)
- Multi-chain support (Polygon, Arbitrum, BSC)

---

## 📄 License

This project is licensed under the **MIT License**.

