import { redis } from '../../../infra/redis.js'
import { eventQueue } from '../../../queue/events.queue.js'
import { logsQueue } from '../../../queue/logs.queue.js'

export const createEventService = async ({ type, payload }) => {
  if (!type || !payload) {
    throw new Error('type and payload are required')
  }

  const id = Date.now().toString()

  const event = {
    id,
    type,
    payload,
    status: 'pending',
    createdAt: new Date(),
  }

  // ✅ store in Redis
  await redis.set(`event:${id}`, JSON.stringify(event))

  // ✅ push job
  await eventQueue.add('process-event', { eventId: id })
  await logsQueue.add('log-event', {
    eventId: id,
    type,
    timestamp: new Date(),
  })

  return event
}

export const getEventById = async (id) => {
  const data = await redis.get(`event:${id}`)
  return data ? JSON.parse(data) : null
}

export const updateEventStatus = async (id, status) => {
  const data = await redis.get(`event:${id}`)
  if (!data) return

  const event = JSON.parse(data)
  event.status = status

  await redis.set(`event:${id}`, JSON.stringify(event))
}
