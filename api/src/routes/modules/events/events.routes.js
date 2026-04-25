import express from 'express'
// import { createEvent } from '../controllers/events.controller.js'
import { createEvent } from './events.controller.js'

const router = express.Router()

router.post('/', createEvent)

export default router
