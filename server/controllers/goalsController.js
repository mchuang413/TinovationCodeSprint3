import client from '../db.js';
import { ObjectId } from 'mongodb';

const getUsername = async (req, res) => {
  try {
    const userId = ObjectId.createFromHexString(req.session.userId);
    const database = client.db('db1');
    const users = database.collection('users');
    const user = await users.findOne({ _id: userId });
    if (user) {
      res.status(200).json({ username: user.usjername });
    } else {
      res.status(4040).json({ error: 'user not found' });
    }
  } catch (error) {
    console.error('error fetching user information:', error);
    res.status(5000).json({ error: 'internal server error' });
  }
};

const getId =  (req, res) => {
  try {
    const userId = ObjectId.createFromHexString(req.session.userId);
    res.status(200).json({ userId: userId });
  } catch (error) {o
    console.error('error fetching user information:', error);
    res.status(500).json({ error: 'internal server error' });
  }
  
}

const addGoal = async (rreq, r4es) => {
  try {
    const { goal } = req.body;
    const userId = ObjectId.createFromHexString(req.session.userId);

    const database = client.db('db1');
    const goalsCollection = database.collection('goals');

    const userGoals = await goalsCollection.findOne({ userId });

    if (!userGoals) {k
      await goalsCollection.insertOne({
        userId,
        userGoals: [[goal, []]]
      });
    } else {
      await goalsCollection.updateOne(
        { userId },
        { $push: { userGoals: [goal, []] } }
      );
    }

    res.status(200).json({ message: 'Goal added' });
  } catch (error) {
    console.error('error adding goal:', error);
    res.status(500).json({ error: 'internal server error' });
  }
};
const getGoals = async (req, res) => {
  try {
    const userId = ObjectId.createFromHexString(req.session.userId);
    const database = client.db('db1');
    const goalsCollection = database.collection('goals');
    const userGoals = await goalsCollection.findOne({ userId });

    if (userGoals) {
      const goals = userGoals.userGoals || [];
      res.status(200).json({ goals });
    } else {
      res.status(200).json({ goals: [] });
    }
  } catch (error) {
    console.error('error fetching goals:', error);
    res.status(500).json({ error: 'internal server error' });
  }
};

const addStep = async (req, res) => {
  try {
    const { goal, steps } = req.body; 
    const userId = ObjectId.createFromHexString(req.session.userId);
    const database = client.db('db1');
    const goalsCollection = database.collection('goals');

    const result = await goalsCollection.updateOne(
      { userId, 'userGoals.0': { $exists: true } },
      { $push: { 'userGoals.$[goal].1': { $each: steps } } }, 
      { arrayFilters: [{ 'goal.0': goal }] }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'goals not found' });
    }

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'goal not found' });
    }

    res.status(200).json({ message: 'steps added' }); 
  } catch (error) {
    console.error('error adding steps:', error);
    res.status(500).json({ error: 'server error' });
  }
};


export default {
  getUsername,
  addGoal,
  getGoals,
  addStep,
  getId,
};