import { CheckIn, Prisma } from '@prisma/client'

export interface ChekInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyById(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
}
