// // USED FOR TESTING
import express from 'express'
import eventsRoutes from './routes/events.routes'
const app = express()

app.use(express.json())
app.use('/events', eventsRoutes)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

export default app
