import { Router } from 'express'
import { TwitService } from './twit.service.js'
import { authMiddleware } from '../auth.middleware.js'

const router = Router()

const twitService = new TwitService()

router.post('/', authMiddleware, (req, res) => {
    const twit = twitService.createTweet(req.body)
    res.status(201).json(twit)
})

export const twitRouter = router
