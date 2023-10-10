import { Scenes } from 'telegraf';

export const dataWizard = new Scenes.WizardScene(
  'data-wizard',
  async (ctx) => {
    await ctx.reply('Please enter a name:');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const name = ctx.message.text;
    ctx.wizard.state.data = { name };
    await ctx.reply('Please enter a description:');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const description = ctx.message.text;
    ctx.wizard.state.data.description = description;
    await ctx.reply('Please enter a price:');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const price = ctx.message.text;
    ctx.wizard.state.data.price = price;
    
    const { name, description } = ctx.wizard.state.data;
    console.log({ name, description, price });
    
    await ctx.reply(`Data has been saved: Name: ${name}, Description: ${description}, Price: ${price}`);
    return ctx.scene.leave();
  }
);
