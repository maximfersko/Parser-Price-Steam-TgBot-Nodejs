import { Markup, Telegraf, Scenes} from "telegraf";
import { COMMAND_TEXT } from "./config/phrases";
import {start} from "./controllers/commands"

const bot = new Telegraf(process.env.TELEGRAM_ACCESS_KEY, {
    handlerTimeout: Infinity,
})

const setupBot = () =>  {
    bot.start(start)

    return bot;
}

module.exports = {
    setupBot
}