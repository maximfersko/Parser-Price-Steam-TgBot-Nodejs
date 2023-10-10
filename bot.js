import { Telegraf} from "telegraf";
import { DATA_ACTION } from "./config/phrases.js";
import {start, 
    chooseGameCallback, 
    backToMainMenuCallback} from "./controllers/commands.js"
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
const bot = new Telegraf(process.env.TELEGRAM_ACCESS_KEY, {
    handlerTimeout: Infinity,
})

export const setupBot = () =>  {
    bot.start(start);
    bot.action(`${DATA_ACTION.invValue}`, chooseGameCallback);
    bot.action(`${DATA_ACTION.backToMainMenuValue}`, backToMainMenuCallback)
    bot.launch();
}