import server from '@/infra/http/server'
import request from 'supertest'
describe('Should test Ride API path ride/confirm', () => {
  it('deve retornar erro se os endereços de origem ou destino estiverem em branco', async () => {
    const response = await request(server)
      .patch('/ride/confirm')
      .send({
        customer_id: '123',
        origin: '',
        destination: 'Destination Address',
        distance: 10,
        duration: '00:15',
        driver: {
          id: 1,
          name: 'Driver Name',
        },
      })
    expect(response.status).toBe(400)
    expect(response.body.error_description).toBe(
      'Os endereços de origem e destino não podem estar em branco.',
    )
  })

  it('deve retornar erro se o id do usuário estiver em branco', async () => {
    const response = await request(server)
      .patch('/ride/confirm')
      .send({
        customer_id: '',
        origin: 'Origin Address',
        destination: 'Destination Address',
        distance: 10,
        duration: '00:15',
        driver: {
          id: 1,
          name: 'Driver Name',
        },
      })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty(
      'error_description',
      'O id do usuário não pode estar em branco.',
    )
  })

  it('deve retornar erro se os endereços de origem e destino forem iguais', async () => {
    const response = await request(server)
      .patch('/ride/confirm')
      .send({
        customer_id: '123',
        origin: 'Same Address',
        destination: 'Same Address',
        distance: 10,
        duration: '00:15',
        driver: {
          id: 1,
          name: 'Driver Name',
        },
      })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty(
      'error_description',
      'Os endereços de origem e destino não podem ser o mesmo endereço.',
    )
  })

  it('deve retornar erro se o motorista não for válido', async () => {
    const response = await request(server)
      .patch('/ride/confirm')
      .send({
        customer_id: '123',
        origin: 'Origin Address',
        destination: 'Destination Address',
        distance: 10,
        duration: '00:15',
        driver: {
          id: 999, // ID inválido
          name: 'Invalid Driver',
        },
      })
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error_code', 'DRIVER_NOT_FOUND')
    expect(response.body).toHaveProperty(
      'error_description',
      'Motorista inválido.',
    )
  })

  it('deve retornar erro se a quilometragem não for válida para o motorista selecionado', async () => {
    const response = await request(server)
      .patch('/ride/confirm')
      .send({
        customer_id: '123',
        origin: 'Origin Address',
        destination: 'Destination Address',
        distance: 1, // Quilometragem inválida
        duration: '00:15',
        driver: {
          id: 2,
        },
      })
    expect(response.status).toBe(406)
    expect(response.body.error_code).toBe('INVALID_DISTANCE')
    expect(response.body.error_description).toBe(
      'A quilometragem informada não é válida para o motorista selecionado.',
    )
  })
  it('Should test Ride API path ride/confirm with driver id', async () => {
    const response = await request(server)
      .patch('/ride/confirm')
      .send({
        customer_id: '2be17af3-d65e-4cdb-893f-6b320b7d0b7d',
        origin: 'Rua Quixada 38,21210-440, Rio de Janeiro, rj',
        destination: 'Rua Cacequi 262, 21210-760, Rio de Janeiro, RJ',
        distance: 21,
        duration: '202s',
        driver: {
          id: 2,
        },
        value: 20,
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
  })
})
