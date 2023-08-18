import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const handler = async(req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  console.log(req.body);
  const { data } = req.body; 
  console.log(data)

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

  console.log(response)
  
}

export default handler; 

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
  console.log(user);

  return user;
}

