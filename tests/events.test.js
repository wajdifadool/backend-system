import request from 'supertest'
import app from '../api/src/app.js'

describe('POST /events', () => {
  it('should create event successfully', async () => {
    const res = await request(app)
      .post('/events')
      .send({
        type: 'test',
        payload: { msg: 'hello' },
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.status).toBe('pending')
  })

  it('should fail when missing fields', async () => {
    const res = await request(app).post('/events').send({})

    expect(res.statusCode).toBe(400)
  })
})
