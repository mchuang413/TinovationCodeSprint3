import client from '../db.js';

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const database = client.db('db1');
    const users = database.collection('users');
    const user = await users.findOne({ username });
    if (user && user.password === password) {
      req.session.userId = user._id;
      console.log(`User logged in: ${username}`);
      res.status(200).json({ username, redirect: '/overview.html' });
    } else {
      console.log('Invalid username or password');
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};
  
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const database = client.db('db1');
    const users = database.collection('users');
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      console.log('Username already exists');
      return res.status(400).json({ error: 'Username already exists' });
    }
    const newUser = { username, password };
    await users.insertOne(newUser);


    res.json({ username: newUser.username });
    console.log(`User registered: ${newUser.username}`);
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export default {
    login,
    register,
};