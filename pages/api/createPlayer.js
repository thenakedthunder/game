import { disconnectDb, getUserIfExistsInDb, saveUserToDatabase} from '../../prisma/db';

const handler = async(req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  
  console.log(req)
  const { data } = req.body; 
  let response;
  try {
    console.log(data)
    response = await getUserIfExistsInDb(data.name)
    
    if (response) {
      res.status(200).json(response)
    } else {
      response = await saveUserToDatabase(data.name);
      res.status(201).json(response)
    }
  } catch (error) {
    console.error(error);
    process.exit(1)
  } finally {
    await disconnectDb();
  }
}

export default handler; 
