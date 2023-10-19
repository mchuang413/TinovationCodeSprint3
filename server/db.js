import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://tinovation2:tinovation2023@tinovation2.eliouiv.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectToDatabase();

export default client;