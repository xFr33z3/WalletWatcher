/*
 * Start command
 */

module.exports = function (bot) {
    bot.start((ctx) => {
        ctx.reply(
            "Welcome to <b>WalletWatcher</b>! 👛\n"+
            "<i>You can use this bot to spy other people's wallets</i> 🔎\n"+
            "\n"+
            "/add [addy] • Add a wallet to the watchlist\n"+
            "/remove [addy] • Remove a wallet from the watchlist\n"+
            "/watch [addy] • Check the wallet balance right now\n"+
            "/list • Check your list of addresses\n"+
            "\n"
        , {parse_mode: "HTML"})
    });
};