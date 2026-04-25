import express from 'express'
import eventsRoutes from './routes/modules/events/events.routes.js'
import eventsGetRoutes from './routes/modules/events/events.get.routes.js'

const app = express()
app.use(express.json())
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/events', eventsRoutes)
app.use('/events', eventsGetRoutes)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
