import mongoose from 'mongoose';
import User from '../models/user.js';


const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  goals: [{
    type: String,
  }],
});


 
  const Goal = mongoose.model('Goal', goalSchema);

  const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (user && user.password === password) {
        req.session.userId = user._id;
        console.log(`User logged in: ${username}`);
        res.status(200).json({ username, redirect: '/dashboard.html' });
        
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
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.log('Username already exists');
        return res.status(400).json({ error: 'Username already exists' });
      }
      const newUser = new User({ username, password });
      await newUser.save();

      const newGoals = new Goal({ userId: newUser._id, goals: [] });
      await newGoals.save();

      res.json({ username: newUser.username });
      console.log(`User registered: ${newUser.username}`);
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ error: 'Registration failed' });
    }
  };

export default {
    User,
    login,
    register,
};