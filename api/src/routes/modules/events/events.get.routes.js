import express from 'express'

import { getEventById } from './events.service.js'

const router = express.Router()

router.get('/:id', async (req, res) => {
  const event = await getEventById(req.params.id)

  if (!event) {
    return res.status(404).json({ error: 'event not found' })
  }

  return res.json(event)
})
export default router
