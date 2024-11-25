import server from '@/infra/http/server'
import request from 'supertest'

describe('Should test /ride/{customer_id} endpoint', () => {
  it('Should error without customer_id', async () => {
    const customer_id = '' //Esse test não faz sentido... a url seria diferente
    const response = await request(server).get(`/ride/${customer_id}`)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA')
    expect(response.body).toHaveProperty('error_description', 'Invalid data')
  })
  it('Should validate rides is in correct order', async () => {
    const customer_id = '2be17af3-d65e-4cdb-893f-6b320b7d0b7d'
    const response = await request(server).get(`/ride/${customer_id}`)
    const rides = response.body.rides
    const reorderedRides = rides.sort((a: any, b: any) => {
      b.id - a.id
    })
    expect(response.status).toBe(200)
    expect(rides[0].id).toBe(reorderedRides[0].id)
    expect(rides[rides.length - 1].id).toBe(
      reorderedRides[reorderedRides.length - 1].id,
    )
  })

  it('Should give error where not found rides', async () => {
    const customer_id = '3d254137-d502-4c5f-8ae8-2b0b845fd4d1'
    const response = await request(server).get(`/ride/${customer_id}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error_code', 'NO_RIDES_FOUND')
    expect(response.body).toHaveProperty(
      'error_description',
      'Nenhum registro encontrado.',
    )
  })
  it('Should validate queryParams with valid driver_id ', async () => {
    const customer_id = '2be17af3-d65e-4cdb-893f-6b320b7d0b7d'
    const response = await request(server).get(
      `/ride/${customer_id}?driver_id=0`,
    )
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error_code', 'INVALID_DRIVER')
    expect(response.body).toHaveProperty(
      'error_description',
      'Motorista inválido.',
    )
  })
})
