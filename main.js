require('dotenv').config({path: './config/.env'})

import { setupBot } from "./bot"

await setupBot.launch();