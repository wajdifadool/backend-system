import { Worker } from 'bullmq'
import IORedis from 'ioredis'

const connection = new IORedis({
  maxRetriesPerRequest: null,
})

console.log('Logs worker starting...')

const logsWorker = new Worker(
  'logs-queue',
  async (job) => {
    console.log('📄 LOG JOB RECEIVED')
    console.log('Job name:', job.name)
    console.log('Data:', job.data)

    // simulate writing logs
    await new Promise((res) => setTimeout(res, 1000))

    console.log('✅ Log processed for event:', job.data.eventId)
  },
  { connection }
)

logsWorker.on('failed', (job, err) => {
  console.log('Log job failed:', err)
})
