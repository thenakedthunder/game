import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async(req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { data } = req.body; 
  let response;
  try {
    response = await getUserIfExistsInDb(data)
    
    if (response) {
      res.status(200).json(response)
    } else {
      response = await saveUserToDatabase(data);
      res.status(201).json(response)
    }
  } catch (error) {
    console.error(error);
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

const getUserIfExistsInDb = async (data) => {
  const user = await prisma.user.findFirst({ where: { name: data.name } });
  
  return user;
}

const saveUserToDatabase = async (data) => {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      money: 10000,
    },
  });
  
  return user;
}

export default handler; 
