import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from '../check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-merory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-9.4227181),
      longitude: new Decimal(-40.5025375),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.getRealSystemTime()
  })

  it('shoud be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -9.4227181,
      userLongitude: -40.5025375,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('shoud not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -9.4227181,
      userLongitude: -40.5025375,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -9.4227181,
        userLongitude: -40.5025375,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('shoud be able to chek in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'userId-01',
      userLatitude: -9.4227181,
      userLongitude: -40.5025375,
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'userId-01',
      userLatitude: -9.4227181,
      userLongitude: -40.5025375,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gyn', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-9.4232685),
      longitude: new Decimal(-40.4819381),
    })
    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'userId-01',
        userLatitude: -9.4559505,
        userLongitude: -40.5121505,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
