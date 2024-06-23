import { FastifyRequest, FastifyReply } from 'fastify'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, replay: FastifyReply) => {
    const { role } = request.user
    console.log(`Role: ${role}, RoleToVerify: ${roleToVerify}`)
    if (role !== roleToVerify) {
      return replay.status(401).send({ message: 'Unauthorized' })
    }
  }
}
