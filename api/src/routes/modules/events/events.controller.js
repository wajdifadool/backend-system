import { createEventService } from './events.service.js'

export const createEvent = async (req, res) => {
  try {
    const { type, payload } = req.body || {}

    if (!type || !payload) {
      return res.status(400).json({ error: 'type and payload are required' })
    }

    const event = await createEventService({ type, payload })

    // TEMP (we’ll replace with DB later)
    // const event = {
    //   id: Date.now().toString(),
    //   type,
    //   payload,
    //   status: 'pending',
    // }

    return res.status(201).json(event)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal server error' })
  }
}
