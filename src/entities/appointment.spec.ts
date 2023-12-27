import { expect, test } from 'vitest'
import { Appointiment } from './appointment'
import { getFutureDate } from '../tests/utils/get-future-date'

test('create an appointment', () => {
  const startDate = getFutureDate('2023-12-10')
  const endDate = getFutureDate('2023-12-11')

  const appointment = new Appointiment({
    customer: 'John Doe',
    startsAt: startDate,
    endsAt: endDate
  })

  expect(appointment).toBeInstanceOf(Appointiment)
  expect(appointment.customer).toEqual('John Doe')
})

test('cannot create an appointment with end date before start date', () => {
  const startDate = getFutureDate('2023-12-26')
  const endDate = getFutureDate('2023-12-25')

  expect(() => {
    return new Appointiment({
      customer: 'John Doe',
      startsAt: startDate,
      endsAt: endDate
    })
  }).toThrow()
})

test('cannot create an appointment with start date before now', () => {
  const startDate = new Date()
  const endDate = new Date()
  startDate.setDate(startDate.getDate() - 1)
  endDate.setDate(endDate.getDate() + 3)

  expect(() => {
    return new Appointiment({
      customer: 'John Doe',
      startsAt: startDate,
      endsAt: endDate
    })
  }).toThrow()
})
