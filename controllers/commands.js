import { COMMAND_TEXT, DATA_VALUE } from "../config/phrases";

const start = (ctx) => {
    ctx.reply(`Добро пожжаловать ${ctx.from.username} ! Выбери один из пунктов.`, Markup.inlineKeyboard([
        [Markup.button.callback(COMMAND_TEXT.getInventoryValue, DATA_VALUE.invValue)],
        [Markup.button.callback('test', 't')]
    ]))
}

const chooseGameCallback = (ctx) => {

    ctx.editMessageReplyMarkup({ inline_keyboard: [] });

    ctx.editMessageText('Выберите игру:', Markup.inlineKeyboard([
        [Markup.button.callback(COMMAND_TEXT.dota, 'dota')],
        [Markup.button.callback(COMMAND_TEXT.cs, 'cs')]
    ]))
}

module.exports = {
    start,
    chooseGameCallback
}