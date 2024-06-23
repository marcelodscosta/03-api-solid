import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await replay.jwtSign({}, { sign: { sub: user.id } })

    const refreshToken = await replay.jwtSign(
      {},
      { sign: { sub: user.id, expiresIn: '7d' } },
    )

    return replay
      .setCookie('refreshToken', refreshToken, {
        path: '/', // route that will have access to the cookie
        secure: true, // front-end cannot read the value
        sameSite: true, // access only within the domain
        httpOnly: true, // cookie will only be accessed by the backend
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return replay.status(400).send()
    }
  }
}
