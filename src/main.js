import { Markup, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import config from 'config';

const bot = new Telegraf(config.get('TELEGRAM_ACCESS_KEY'), {
    handlerTimeout: Infinity,

})

bot.command('start', ctx => {
    ctx.reply('joi')
})

bot.on(message('text'), ctx => {
    ctx.reply()
})

bot.launch();