import { z } from 'zod'

export const createTweetDto = z.object({
    text: z.string().min(1, 'Text is required').max(255),
})
