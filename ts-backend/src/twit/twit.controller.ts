import { Request, Response, Router } from 'express'
import { TwitService } from './twit.service'
import { authMiddleware } from '@/auth.middleware'

const router = Router()

const twitService = new TwitService()

router.post('/', authMiddleware, (req: Request, res: Response) => {
    const twit = twitService.createTweet(req.body)
    res.status(201).json(twit)
})

export const twitRouter = router
