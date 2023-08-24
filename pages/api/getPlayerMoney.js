import { PrismaClient } from '@prisma/client';
import { getUserMoneyFromDb } from '../../prisma/db';

const prisma = new PrismaClient();

const handler = async(req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' });
    return;
  }

  const { name } = req.query.name;

  try {
    const money = await getUserMoneyFromDb(name);
    res.status(200).json(money);
  } catch (error) {
    console.error(error);
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

export default handler;
