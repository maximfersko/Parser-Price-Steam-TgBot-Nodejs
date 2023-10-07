import { Markup, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import config from 'config';
import axios from "axios";

const bot = new Telegraf(config.get('TELEGRAM_ACCESS_KEY'), {
    handlerTimeout: Infinity,
})

bot.command('start', ctx => {
    ctx.reply(`Добро пожжаловать ${ctx.from.username} ! Выбери один из пунктов.`, Markup.inlineKeyboard([
        [Markup.button.callback('Узнать стоимость инвентаря по игре', 'priceAllInventory')],
        [Markup.button.callback('test', 't')]
    ]))
})

bot.action('priceAllInventory', async (ctx) => {

    await ctx.editMessageReplyMarkup({ inline_keyboard: [] });

    await ctx.editMessageText('Выберите игру:', Markup.inlineKeyboard([
        [Markup.button.callback('Dota 2', 'dota')],
        [Markup.button.callback('Counter Strike 2', 'cs')]
    ]))
})




bot.on(message('text'), ctx => {
    ctx.reply()
})

bot.launch();