import server from '../../../infra/http/server'
import request from 'supertest'

describe('Should test Ride API', () => {
  it.skip('Should test Ride API', async () => {
    const input = {
      customer_id: '2be17af3-d65e-4cdb-893f-6b320b7d0b7d',
      origin: 'Rua Quixada 38,21210-440, Rio de Janeiro, rj',
      destination: 'Rua Cacequi 262, 21210-760, Rio de Janeiro, RJ',
    }

    const response = await await request(server)
      .post('/ride/estimate')
      .send(input)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('distance', 2.02)
  })
  it('Should fail test on same origin and destination', async () => {
    const input = {
      customer_id: '2be17af3-d65e-4cdb-893f-6b320b7d0b7d',
      origin: 'Rua Quixada 38,21210-440, Rio de Janeiro, rj',
      destination: 'Rua Quixada 38,21210-440, Rio de Janeiro, rj',
    }

    const response = await await request(server)
      .post('/ride/estimate')
      .send(input)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA')
    expect(response.body).toHaveProperty(
      'error_description',
      "Origin and destination can't be the same",
    )
  })
  it('Should fail test on blank origin', async () => {
    const input = {
      customer_id: '2be17af3-d65e-4cdb-893f-6b320b7d0b7d',
      origin: '',
      destination: 'Rua Quixada 38,21210-440, Rio de Janeiro, rj',
    }

    const response = await await request(server)
      .post('/ride/estimate')
      .send(input)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA')
    expect(response.body).toHaveProperty('error_description', 'Invalid data')
  })
  it('Should fail test on blank destination', async () => {
    const input = {
      customer_id: '2be17af3-d65e-4cdb-893f-6b320b7d0b7d',
      origin: 'Rua Quixada 38,21210-440, Rio de Janeiro, rj',
      destination: '',
    }

    const response = await await request(server)
      .post('/ride/estimate')
      .send(input)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA')
    expect(response.body).toHaveProperty('error_description', 'Invalid data')
  })
  it('Should fail test on blank destination', async () => {
    const input = {
      origin: 'Rua Quixada 38,21210-440, Rio de Janeiro, rj',
      destination: 'asdfasdf',
    }

    const response = await await request(server)
      .post('/ride/estimate')
      .send(input)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA')
    expect(response.body).toHaveProperty('error_description', 'Invalid data')
  })
})
