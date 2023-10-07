import { Scenes } from "telegraf";

const idProfileSteam = new Scenes.WizardScene('idProfileSteam');

idProfileSteam.enter(ctx => ctx.reply('Введи Steam ID профиля'));


module.exports = {idProfileSteam};