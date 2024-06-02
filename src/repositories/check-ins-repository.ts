import { CheckIn, Prisma } from '@prisma/client'

export interface ChekInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
