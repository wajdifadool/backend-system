import { Worker } from 'bullmq'
import IORedis from 'ioredis'

import { updateEventStatus } from '../api/src/routes/modules/events/events.service.js'
// 1. Connect to Redis
const connection = new IORedis({
  maxRetriesPerRequest: null,
})

console.log('Worker starting...')

// 2. Create worker and attach it to the SAME queue name
const worker = new Worker(
  'events-queue', // 👈 MUST match queue name exactly
  async (job) => {
    const { eventId } = job.data

    console.log('Processing:', eventId)

    await updateEventStatus(eventId, 'processing')

    await new Promise((res) => setTimeout(res, 30000))

    await updateEventStatus(eventId, 'completed')

    console.log('Done:', eventId)
  },
  { connection }
)

// worker.on('completed', (job) => {
//   console.log(`Job ${job.id} completed`)
//   //   console.log(`ahaa`)
// })

worker.on('failed', (job, err) => {
  console.log(`Job ${job?.id} failed`, err)
})
