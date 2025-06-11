import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { NextFunction, Request, Response } from 'express'
import { tweetRouter } from './tweet/tweet.controller'

dotenv.config()

const app = express()

app.set('view engine', 'ejs')
// app.set('views', path.join('/src/views'))
app.set('views', path.join(__dirname, 'views'))

async function main() {
    app.use(express.json())

    app.use('/api/tweets', tweetRouter)

    app.get('/random-data', (req, res) => {
        res.render('tweet', {
            data: {
                text: 'sample text',
                description: 'sample description',
            },
        })
    })

    app.get('/error', (req, res) => {
        throw new Error('error')
    })

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack)
        res.status(500).json({ message: 'Something went wrong!' })
    })

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`)
    })
}

main()
