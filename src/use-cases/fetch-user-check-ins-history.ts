import { ChekInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: ChekInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchCheckInsHistoryUseCaseRequest): Promise<FetchCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyById(userId, page)

    return {
      checkIns,
    }
  }
}
