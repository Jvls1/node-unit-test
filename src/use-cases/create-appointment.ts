import { Appointiment } from '../entities/appointment'
import { type AppointimentsRepository } from '../repositories/appointments-repository'

interface CreateAppointmentRequest {
  customer: string
  startsAt: Date
  endsAt: Date
}

type CreateAppointmentResponse = Appointiment

export class CreateAppointment {
  constructor (
    private readonly appointmentsRepository: AppointimentsRepository
  ) {}

  async execute ({
    customer,
    startsAt,
    endsAt
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(
      startsAt,
      endsAt
    )

    if (overlappingAppointment != null) {
      throw new Error('Another appointment overlaps this appointment dates')
    }

    const appointment = new Appointiment({
      customer,
      startsAt,
      endsAt
    })

    await this.appointmentsRepository.create(appointment)

    return appointment
  }
}
