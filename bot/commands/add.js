/*
 * Command to add a wallet.
 */

const {addWallet} = require("../db/wallets");

module.exports = function(bot){
    bot.command("add", (ctx) => {
        const text = ctx.message.text.split(" ");
        const address = text[1]; // argomento 1

        if (!address) {
            return ctx.reply("❔ Usage: /add <addy>");
        }
        const result = addWallet(ctx.from.id, address)
        switch (result) {
            case "exists": ctx.reply(`❌ <b>Wallet already exists:</b> <code>${address}</code>`, {parse_mode: "HTML"}); break;
            case "invalid": ctx.reply(`👎 <b>Invalid wallet:</b> <code>${address}</code>`, {parse_mode: "HTML"}); break;
            default: ctx.reply(`🗄️ <b>Wallet saved:</b> <code>${address}</code>`, {parse_mode: "HTML"}); break;
        }
    });
}
