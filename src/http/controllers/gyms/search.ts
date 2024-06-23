import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, replay: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQuerySchema.parse(request.body)

  const searchGymUseCase = makeSearchGymsUseCase()

  const { gym } = await searchGymUseCase.execute({ query, page })

  return replay.status(200).send({
    gym,
  })
}
