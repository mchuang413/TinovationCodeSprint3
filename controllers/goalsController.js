import client from '../db.js';

const getUsername = async (req, res) => {
  try {
    const userId = req.session.userId;
    const database = client.db('db1');
    const users = database.collection('users');
    const user = await users.findOne({userId});
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

