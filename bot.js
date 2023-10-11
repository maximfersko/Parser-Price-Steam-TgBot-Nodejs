import {
    Telegraf,
    Scenes
} from "telegraf";
import {
    DATA_ACTION
} from "./config/phrases.js";
import dotenv from 'dotenv';
import {
    createPagesInDB
} from './services/notion.js'
import {
    dataWizard
} from "./controllers/budgetScene.js"
import {
    start,
    chooseGameCallback,
    backToMainMenuCallback,
    priceSteamInventoryCallback
} from "./controllers/commands.js"

dotenv.config({
    path: './config/.env'
});

const bot = new Telegraf(process.env.TELEGRAM_ACCESS_KEY, {
    handlerTimeout: Infinity,
})

const stage = new Scenes.Stage([dataWizard]);
bot.use(stage.middleware());

export const setupBot = () => {
    bot.start(start);
    bot.action(`${DATA_ACTION.invValue}`, chooseGameCallback);
    bot.action(`${DATA_ACTION.backToMainMenuValue}`,
        backToMainMenuCallback)
    bot.action(`${DATA_ACTION.cs}`, priceSteamInventoryCallback);
    bot.action(`${DATA_ACTION.op}`, (ctx) => {
        if (ctx.scene) {
            ctx.scene.enter('data-wizard');
        } else {
            console.log("Scene is undefined");
        }
    });
    return bot;
}

// bot.on('message', async(ctx) => {
//     try {
//         const text = ctx.message.text;
//         const notionResponse = await createPagesInDB(text, 'testDesc', 999);
//         ctx.reply(`${notionResponse.url}`);
//     } catch (error) {
//         console.log(error.message);
//     }
// })