import { describe, expect, it } from 'vitest'
import { CreateAppointment } from './create-appointment'
import { Appointiment } from '../entities/appointment'
import { getFutureDate } from '../tests/utils/get-future-date'
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository'

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentsRepository)
    const startDate = getFutureDate('2023-12-10')
    const endDate = getFutureDate('2023-12-11')

    void expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: startDate,
      endsAt: endDate
    })).resolves.toBeInstanceOf(Appointiment)
  })

  it('should not be able to create an appointment with overlapping dates', async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentsRepository)
    const startDate = getFutureDate('2023-12-10')
    const endDate = getFutureDate('2023-12-15')

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt: startDate,
      endsAt: endDate
    })

    void expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-12-14'),
      endsAt: getFutureDate('2023-12-18')
    })).rejects.toBeInstanceOf(Error)

    void expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-12-08'),
      endsAt: getFutureDate('2023-12-12')
    })).rejects.toBeInstanceOf(Error)

    void expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-12-08'),
      endsAt: getFutureDate('2023-12-17')
    })).rejects.toBeInstanceOf(Error)

    void expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-12-11'),
      endsAt: getFutureDate('2023-12-12')
    })).rejects.toBeInstanceOf(Error)
  })
})
