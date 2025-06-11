import { Request, Response, Router } from 'express'
import { authMiddleware } from '@/auth.middleware'
import { TweetService } from './tweet.service'

const router = Router()

const tweetService = new TweetService()

router.post('/', authMiddleware, (req: Request, res: Response) => {
    const tweet = tweetService.createTweet(req.body)
    res.status(201).json(tweet)
})

export const tweetRouter = router
