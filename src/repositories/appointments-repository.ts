import { type Appointiment } from '../entities/appointment'

export interface AppointimentsRepository {
  create: (appointiment: Appointiment) => Promise<void>
  findOverlappingAppointment: (startsAt: Date, endsAt: Date) => Promise<Appointiment | null>
}
