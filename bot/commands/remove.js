/*
 * Command to remove a wallet.
 */

const {removeWallet} = require("../db/wallets");

module.exports = function(bot){
    bot.command("remove", (ctx) => {
        const text = ctx.message.text.split(" ");
        const address = text[1]; // argomento 1

        if (!address) {
            return ctx.reply("Usage: /remove <addy>");
        }
        if (removeWallet(ctx.from.id, address)){
            ctx.reply(`👋 <b>Wallet removed</b>: <code>${address}</code>`, {parse_mode: "HTML"});
        }else{
            ctx.reply(`👀 <b>The wallet does not exist:</b> <code>${address}</code>`, {parse_mode: "HTML"});
        }
    });
}
