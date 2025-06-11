import express from 'express'
import { twitRouter } from './src/twit/twit.controller.js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set('views', path.join(__dirname, '/src/views'))
app.set('view engine', 'ejs')

async function main() {
    app.use(express.json())

    app.use('/api/twits', twitRouter)

    app.get('/random-data', (req, res) => {
        res.render('twit', {
            data: {
                text: 'sample text',
                description: 'sample description',
            },
        })
    })

    app.get('/error', (req, res) => {
        throw new Error('error')
    })

    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).json({ message: 'Something went wrong!' })
    })

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`)
    })
}

main()
