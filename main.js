import { setupBot } from './bot.js';

(async function() {
    try {
        await setupBot().launch();
    } catch (error) {
        console.error('Failed to setup the bot:', error);
    }
}());
