import {  COMMAND_TEXT, DATA_ACTION } from "../config/phrases.js";
import { Markup } from "telegraf";

export const start = (ctx) => {
    ctx.reply(`Добро пожжаловать ${ctx.from.username} ! Выбери один из пунктов.`, Markup.inlineKeyboard([
        [Markup.button.callback(COMMAND_TEXT.getInventoryValue, DATA_ACTION.invValue)],
        [Markup.button.callback('test', 't')]
    ]))
}

export const chooseGameCallback = (ctx) => {

    ctx.editMessageReplyMarkup({ inline_keyboard: [] });

    ctx.editMessageText('Выберите игру:', Markup.inlineKeyboard([
        [Markup.button.callback(COMMAND_TEXT.dota, DATA_ACTION.dota)],
        [Markup.button.callback(COMMAND_TEXT.cs, DATA_ACTION.cs)],
        [Markup.button.callback(COMMAND_TEXT.backToMainMenu, DATA_ACTION.backToMainMenuValue)]
    ]))
}

export const backToMainMenuCallback = (ctx) => {
    ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    start(ctx);
}