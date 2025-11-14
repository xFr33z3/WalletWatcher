const { startTxMonitor } = require('./bot/jobs/txMonitor')
const { Telegraf } = require('telegraf')
const gradient = require("gradient-string")
const logger = require("pino")({
    transport: {
        target: "pino-pretty"
    }
});

require("dotenv").config({quiet: true})

console.log(gradient.fruit      ("\n          WalletWatcher BOT         "))
console.log(gradient.cristal    ("   https://xfr33z3.altervista.org   \n"))

const BOT_TOKEN = process.env.BOT_TOKEN
const bot = new Telegraf(BOT_TOKEN)

require("./bot/commands/start")(bot)
require("./bot/commands/add")(bot)
require("./bot/commands/remove")(bot)
require("./bot/commands/watch")(bot)
require("./bot/commands/list")(bot)

// Start the TX Monitor
startTxMonitor(bot)

// bot closing
logger.info("Starting bot")
bot.launch().then(r => {
    console.log("Goodbye...")
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))