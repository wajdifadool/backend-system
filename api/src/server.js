import express from 'express'
import eventsRoutes from './routes/events.routes.js'

const app = express()

app.use(express.json())
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/events', eventsRoutes)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
