const db = require("./db");

function isValidWallet(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function addWallet(userId, address) {
    address = address.toLowerCase();
    if(!isValidWallet(address)) {return "invalid"}
    const wallets = getWallets(userId)
    for (const wallet of wallets) {
        if (wallet.address === address){
            return "exists"
        }
    }
    const stmt = db.prepare("INSERT INTO wallets (userId, address) VALUES (?, ?)")
    stmt.run(userId, address)
    return true
}

function getWallets(userId) {
    const stmt = db.prepare("SELECT * FROM wallets WHERE userId = ?")
    return stmt.all(userId) || []
}

function removeWallet(userId, address) {
    address = address.toLowerCase();
    const stmt = db.prepare("DELETE FROM wallets WHERE userId = ? AND address = ?");
    const result = stmt.run(userId, address);
    return result.changes > 0;
}

module.exports = {
    isValidWallet,
    addWallet,
    getWallets,
    removeWallet
};