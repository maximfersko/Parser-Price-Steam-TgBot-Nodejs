import dotenv from 'dotenv';
import {Client} from '@notionhq/client'

dotenv.config({ path: 'config/.env' });

const notion = new Client({
    auth: process.env.NOTION_ACCESS_KEY,
})

export async function createPagesInDB(name, text, sum) {
    const response = await notion.pages.create({
        parent: { database_id: process.env.NOTION_DB_ID },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: name
                        }
                    }
                ]
            },
            Date: {
                date: {
                    start: new Date().toISOString()
                }
            }
        }
    })

    // await notion.blocks.children.append({
    //     block_id: response.id,
    //     children: [
    //         {
    //             object: 'block',
    //             type: 'pharagraph',
    //             pharagraph: {
    //                 rich_text: [
    //                     {
    //                         type: 'text',
    //                         text: {
    //                             content: text,
    //                         }
    //                     }
    //                 ]
    //             }
    //         }
    //     ]
    // })

    return response;
}
