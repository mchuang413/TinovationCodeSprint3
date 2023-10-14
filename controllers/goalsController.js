import mongoose from 'mongoose';
import User from '../models/user.js';
//const User = mongoose.model('User');


const getUserInfo = async (req, res) => {
  try {
    const userId = req.session.userId;
    console.log(userId);
    console.log(User);
    if (userId) {
      const user = await User.findOne({ _id: userId }); 
      if (user) {
        res.status(200).json({ username: user.username });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  getUserInfo,
};
