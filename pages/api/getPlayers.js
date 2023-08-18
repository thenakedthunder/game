import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async(req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' });
    return;
  }

  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

export default handler;
