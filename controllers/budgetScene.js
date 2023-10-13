import { Scenes } from 'telegraf';
import { createPagesInDB } from "../services/notion.js"

export const dataWizard = new Scenes.WizardScene(
    'data-wizard',
    async (ctx) => {
        await ctx.reply('Название операции:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        const name = ctx.message.text;
        ctx.scene.state.data = {
            name
        };
        await ctx.reply('Описание покупки:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        const description = ctx.message.text;
        ctx.scene.state.data.description = description;
        await ctx.reply('Введи сумму:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        const price = ctx.message.text;
        ctx.scene.state.data.price = price;

        const {
            name,
            description
        } = ctx.scene.state.data;

        console.log({
            name,
            description,
            price
        });

        // await ctx.reply(`Data has been saved: Name: ${name}, Description: ${description}, Price: ${price}`);
        return ctx.scene.leave();
    }
);


dataWizard.leave(async (ctx) => {
    console.log('Leaving the data-wizard scene');
    const { name, description, price } = ctx.scene.state.data;
    
    try {
        const notionResponse = await createPagesInDB(name, description, price);
        await ctx.reply(`Запись успешно добавлена ✅ \n ${notionResponse.url}`);
    } catch (error) {
        console.error(error);
        await ctx.reply('Произошла ошибка при добавлении записи в базу данных Notion');
    }

    ctx.scene.state.data = null; 
});
