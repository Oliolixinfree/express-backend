import { Request, Response, Router } from 'express'
import { authMiddleware } from '@/auth.middleware'
import { TweetService } from './tweet.service'
import { createTweetDto } from './tweet.dto'

const router = Router()

const tweetService = new TweetService()

router.post('/', authMiddleware, (req: Request, res: Response) => {
    const validation = createTweetDto.safeParse(req.body)

    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors })
    }

    const tweet = tweetService.createTweet(req.body)
    res.status(201).json(tweet)
})

export const tweetRouter = router
