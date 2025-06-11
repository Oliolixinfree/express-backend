import { Router } from 'express'
import { TweetService } from './tweet.service.js'
import { authMiddleware } from '../auth.middleware.js'

const router = Router()

const tweetService = new TweetService()

router.post('/', authMiddleware, (req, res) => {
    const tweet = tweetService.createTweet(req.body)
    res.status(201).json(tweet)
})

export const tweetRouter = router
