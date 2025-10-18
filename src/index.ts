import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'motya@example.com',
      password: 'supersecret',
      username: 'motya',
      avatarUrl: null,
    },
  })
  console.log('Created user:', user)

  const allUsers = await prisma.user.findMany()
  console.log(' All users:')
  console.dir(allUsers, { depth: null })
}

main()
  .catch((e) => {
    console.error(' Error:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
