import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: 'https://us1-amazed-rhino-39925.upstash.io',
  token: process.env.REDIS_KEY!,
})
