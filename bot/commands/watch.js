/*
 * Command to check balance of a specific wallet
 */

const getBalance = require('../utils/getBalance');
const { isValidWallet } = require("../db/wallets");

module.exports = function(bot){
    bot.command("watch", async (ctx) => {


        let address = ctx.text.split(" ")[1]
        if(address !== undefined){

            if(!isValidWallet(ctx)){ // Invalid wallet addy
                return ctx.reply("❌ Invalid wallet address")
            }

            const balance = await getBalance(address)
            if (balance === null) { // Can't fetch balance
                return ctx.reply("⚠️ Failed to fetch balance. Try again later.");
            }
            if(balance !== false){ // Displaying wallet balance
                return ctx.reply(
                    `Watching wallet: <code>${address}</code>\n\n` +
                    `Balance: <b>${balance}</b>`,
                    { parse_mode: "HTML" }
                )
            }

        }else{
            return ctx.reply(
                "Invalid command, correct usage\n"+
                "/watch <wallet>"
            )
        }
    })
}