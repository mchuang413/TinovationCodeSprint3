import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const uri = 'mongodb+srv://tinovation2:tinovation2023@tinovation2.eliouiv.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri);

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  });

  const User = mongoose.model('User', userSchema);


  const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (user && bcrypt.compareSync(password, user.password)) {
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
