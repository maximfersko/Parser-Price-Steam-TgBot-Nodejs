import axios from "axios";
import dotenv from 'dotenv';

dotenv.config({
    path: 'config/.env'
});

export async function getInventoryValue() {
    const apiKey = process.env.STEAM_ACCESS_KEY;
    const steamId = '76561199526983663';
    try {
        const inventoryResponse = await axios.get(
            `http://steamcommunity.com/profiles/${steamId}/inventory/json/730/2`, {
                params: {
                    key: apiKey
                }
            });
        const inventory = inventoryResponse.data.rgInventory;
        console.log(inventory);
        let totalValue = 0;
        for (const itemKey in inventory) {
            const item = inventory[itemKey];
            const assetClassInfoResponse = await axios.get(
                `https://api.steampowered.com/ISteamUser/GetAssetClassInfo/v1`, {
                    params: {
                        key: apiKey,
                        appid: 730,
                        assetid: item.assetid,
                        classid: item.classid,
                        instanceid: item.instanceid
                    }
                });
            const assetClassInfo = assetClassInfoResponse.data;

            console.log(assetClassInfo);

            const priceResponse = await axios.get(
                `http://steamcommunity.com/market/priceoverview`, {
                    params: {
                        currency: 1,
                        appid: 730,
                        market_hash_name: assetClassInfo
                            .result[item.classid].market_name
                    }
                });
            const price = priceResponse.data.median_price;
            if (price) {
                totalValue += parseFloat(price.replace('$', ''));
            }
            console.log(priceResponse.data);
        }

        console.log(`Total inventory value: $${totalValue}`);
    } catch (error) {
        console.error('Error getting inventory:', error);
    }
}