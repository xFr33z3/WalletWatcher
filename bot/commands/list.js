/*
 * Command to check all your wallets
 */

const {getWallets} = require("../db/wallets");

module.exports = function(bot){
    bot.command("list", (ctx) => {
        const wallets = getWallets(ctx.from.id)
        if(wallets.length === 0){
            ctx.reply("📂 You didn't saved any wallet.")
            return
        }
        let mex = "📋 <b>List of wallets:</b>\n\n"
        for (const wallet of wallets) {
            mex+=`<code>${wallet.address}</code>\n`
        }
        ctx.reply(mex, {parse_mode: "HTML"})
    });
}
