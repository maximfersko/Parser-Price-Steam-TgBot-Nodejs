import dotenv from 'dotenv';
import {
    Client
} from '@notionhq/client'

dotenv.config({
    path: 'config/.env'
});

dotenv.config({
    path: 'config/.env'
});

const notion = new Client({
    auth: process.env.NOTION_ACCESS_KEY,
})

export async function createPagesInDB(name, description, sum) {
    const numberValue = parseFloat(sum);
    const response = await notion.pages.create({
        parent: {
            database_id: process.env.NOTION_DB_ID
        },
        properties: {
            Name: {
                title: [{
                    text: {
                        content: name
                    }
                }]
            },
            Date: {
                date: {
                    start: new Date().toISOString()
                }
            },
            Description: {
                rich_text: [{
                    text: {
                        content: description
                    }
                }]
            },
            Number: {
                number: numberValue
            }
        }
    })

    return response;
}