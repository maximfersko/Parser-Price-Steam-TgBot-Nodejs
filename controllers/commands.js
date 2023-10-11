import { Markup } from "telegraf";
import {
    COMMAND_TEXT,
    DATA_ACTION
} from "../config/phrases.js";
import {
    getInventoryValue
} from "../services/steam.js";

const welcomeMessage = (ctx) =>
    `Добро пожаловать ${ctx.from.username} ! Выбери один из пунктов.`;

const cleanInlKeyboard = (ctx) => {
    return ctx.editMessageReplyMarkup({
        inline_keyboard: []
    });
}

const getMainMenuKeyboard = () => {
    return Markup.inlineKeyboard([
        [Markup.button.callback(COMMAND_TEXT
            .getInventoryValue, DATA_ACTION.invValue)],
        [Markup.button.callback(COMMAND_TEXT.setOperation,
            DATA_ACTION.op)]
    ]);
}

export const start = (ctx) => {
    ctx.reply(welcomeMessage(ctx), getMainMenuKeyboard())
}

export const chooseGameCallback = (ctx) => {
    
    cleanInlKeyboard(ctx);
    
    ctx.editMessageText('Выберите игру:', Markup.inlineKeyboard([
        [Markup.button.callback(COMMAND_TEXT.dota,
            DATA_ACTION.dota)],
        [Markup.button.callback(COMMAND_TEXT.cs,
            DATA_ACTION.cs)],
        [Markup.button.callback(COMMAND_TEXT
            .backToMainMenu, DATA_ACTION
            .backToMainMenuValue)]
    ]));
}

export const backToMainMenuCallback = (ctx) => {
    cleanInlKeyboard(ctx);
    ctx.editMessageText(welcomeMessage(ctx),
    getMainMenuKeyboard());
}

export const priceSteamInventoryCallback = (ctx) => {
    ctx.reply(`your steam price: ${getInventoryValue()}`);
}