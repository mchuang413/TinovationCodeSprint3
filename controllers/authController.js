import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://tinovation2:tinovation2023@tinovation2.eliouiv.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

client.connect(err => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
    } else {
        console.log('Connected to MongoDB');
    }
});

const login = async (req, res) => {
    const { username, password } = req.body;
    const db = client.db('database2');
    const usersCollection = db.collection('users');

    try {
        const user = await usersCollection.findOne({ username });
        if (user && password === user.password) {
            console.log(`User logged in: ${username}`);
            res.status(200).json({ username });
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
    const db = client.db('database2');
    const usersCollection = db.collection('users');

    try {
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            console.log('Username already exists');
            return res.status(400).json({ error: 'Username already exists' });
        }
        const result = await usersCollection.insertOne({ username, password });
        if (result.acknowledged) {
            res.json({ username: username });
            console.log(`User registered: ${username}`);
        } else {
            res.status(500).json({ error: 'Registration failed' });
            console.error('Error during registration: No document inserted');
        }
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
};

export default {
    login,
    register,
};


