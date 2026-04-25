// api/src/queue.js

import { Queue } from 'bullmq'
import IORedis from 'ioredis'

// connection to Redis
const connection = new IORedis({
  maxRetriesPerRequest: null,
})

// create a queue //the conveyor belt
export const eventQueue = new Queue('events-queue', {
  connection,
})
