import { Telegraf, Scenes, session } from "telegraf";
import { DATA_ACTION } from "./config/phrases.js";
import dotenv from 'dotenv';
import { dataWizard } from "./controllers/budgetScene.js"
import {
    start,
    chooseGameCallback,
    backToMainMenuCallback,
    priceSteamInventoryCallback,
    budgetMsg
} from "./controllers/commands.js"

dotenv.config({
    path: './config/.env'
});

const bot = new Telegraf(process.env.TELEGRAM_ACCESS_KEY, {
    handlerTimeout: Infinity,
})

const stage = new Scenes.Stage([dataWizard]);
bot.use(session());
bot.use(stage.middleware());

export const setupBot = () => {
    bot.start(start);
    bot.action(`${DATA_ACTION.invValue}`, chooseGameCallback);
    bot.action(`${DATA_ACTION.backToMainMenuValue}`, backToMainMenuCallback);
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


