import { disconnectDb, updateUserMoney} from '../../prisma/db';

const handler = async(req, res) => {
  if (req.method !== 'PUT') {
    res.status(405).send({ message: 'Only PUT requests allowed' });
    return;
  }
  
  const { data } = req.body; 
  let response;
  try {
    response = await updateUserMoney(data.name, data.money);
    res.status(200).json(response)
  } catch (error) {
    console.error(error);
    process.exit(1)
  } finally {
    await disconnectDb();
  }
}

export default handler; 
