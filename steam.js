import config from "config"
import axios from "axios";

export async function getItemPrice(gameId, nameItem, currency) {
    try {
        const response = await axios.get('http://steamcommunity.com//market/priceoverview', {
            params: {
                currency: currency,
                gameId: gameId,
                market_hash_name: nameItem
            }
        });

        return {...response.data, market_hash_name, nameItem};
    } catch (error) {
        console.error(`Error getting price for item ${nameItem}:`, error);
        return { success: false, market_hash_name: nameItem, error: error.message };
    }
}