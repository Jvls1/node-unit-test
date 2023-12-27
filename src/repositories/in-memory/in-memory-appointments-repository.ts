import { areIntervalsOverlapping } from 'date-fns'
import { type Appointiment } from '../../entities/appointment'
import { type AppointimentsRepository } from '../appointments-repository'

export class InMemoryAppointmentsRepository implements AppointimentsRepository {
  public items: Appointiment[] = []

  async create (appointiment: Appointiment): Promise<void> {
    this.items.push(appointiment)
  }

  async findOverlappingAppointment (startsAt: Date, endsAt: Date): Promise<Appointiment | null> {
    const overlappingAppointment = this.items.find(appointment => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true }
      )
    })

    if (overlappingAppointment == null) {
      return null
    }

    return overlappingAppointment
  }
}
