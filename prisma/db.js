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

export const updateUserMoney = async (name, money) => {
  const user = await prisma.user.update({
    where: { name: name },
    data: { money: money },
  })

  return user;
}

export const getUserMoneyFromDb = async (name) => {
  const user = await getUserIfExistsInDb(name);

  return user.money;
}

export const disconnectDb = async () => {
  prisma.$disconnect();
}
