import crypto from 'node:crypto'
import RideEstimateUseCase from './estimate.usecase'

describe('Should test RideEstimateUseCase', () => {
  it.skip('Should test RideEstimateUseCase', async () => {
    const useCase = new RideEstimateUseCase()
    const input = {
      origin: 'Av. Rio branco 156, Centro, RJ',
      destination: 'Av. Nossa Senhora 400, Copacabana, RJ',
      customer_id: crypto.randomUUID(),
    }
    const output = await useCase.execute(input)

    expect(output).toBeDefined()
  })

  it.skip('Should give error on any field missing', async () => {
    function testCase(input: any) {
      const useCase = new RideEstimateUseCase()
      expect(() => useCase.execute(input)).rejects.toThrow()
    }
    const input = {
      origin: '',
      destination: 'a',
    }

    for (const key in input) {
      const testNullSubject = {
        ...input,
        [key]: null,
      }
      testCase(testNullSubject)

      const testEmptySubject = {
        ...input,
        [key]: '',
      }
      testCase(testEmptySubject)

      const testUndefinedSubject = {
        ...input,
        [key]: undefined,
      }
      testCase(testUndefinedSubject)
    }
  })
})
