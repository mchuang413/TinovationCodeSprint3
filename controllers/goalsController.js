  import client from '../db.js';
  import { ObjectId } from 'mongodb';

  const getUsername = async (req, res) => {
    try {
      const userId = ObjectId.createFromHexString(req.session.userId);
      if (!ObjectId.isValid(userId)) {
        console.log('Invalid session', userId);
        return res.status(400).json({ error: 'Invalid session' });
      }
      const database = client.db('db1');
      const users = database.collection('users');
      const user = await users.findOne({ _id: userId });
      if (user) {
        res.status(200).json({ username: user.username });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  export default {
    getUsername,
  };

