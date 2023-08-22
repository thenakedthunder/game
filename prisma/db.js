import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserIfExistsInDb = async (name) => {
  const user = await prisma.user.findFirst({ where: { name: name } });
  
  return user;
}

export const saveUserToDatabase = async (name) => {
  const user = await prisma.user.create({
    data: {
      name: name,
      money: 10000,
    },
  });
  
  return user;
}

export const disconnectDb = async () => {
  prisma.$disconnect();
}
