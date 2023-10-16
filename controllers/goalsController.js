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

  const addGoal = async (req, res) => {
      try {
          const { goal } = req.body;
          const userId = ObjectId.createFromHexString(req.session.userId);
          if (!ObjectId.isValid(userId)) {
              console.log('Invalid session', userId);
              return res.status(400).json({ error: 'Invalid session' });
          }
          
          const database = client.db('db1');
          const goalsCollection = database.collection('goals');
          
          const userGoals = await goalsCollection.findOne({ userId });

          if (!userGoals) {
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
          console.error('Error adding goal:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  };
  const getGoals = async (req, res) => {
      try {
          const userId = ObjectId.createFromHexString(req.session.userId);
          if (!ObjectId.isValid(userId)) {
              console.log('Invalid session', userId);
              return res.status(400).json({ error: 'Invalid session' });
          }

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
          console.error('Error fetching goals:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  };

  const addStep = async (req, res) => {
    try {
      const { goal, step } = req.body;
      const userId = ObjectId.createFromHexString(req.session.userId);
      if (!ObjectId.isValid(userId)) {
        console.log('Invalid session', userId);
        return res.status(400).json({ error: 'Invalid session' });
      }
  
      const database = client.db('db1');
      const goalsCollection = database.collection('goals');
  
      const userGoals = await goalsCollection.findOne({ userId });
  
      if (!userGoals) {
        return res.status(404).json({ error: 'User goals not found' });
      }
  
      const goalIndex = userGoals.userGoals.findIndex((g) => g[0] === goal);
  
      if (goalIndex === -1) {
        return res.status(404).json({ error: 'Goal not found' });
      }
  
      const steps = userGoals.userGoals[goalIndex][1];
      steps.push(step);
  
      await goalsCollection.updateOne(
        { userId },
        { $set: { userGoals } }
      );
  
      res.status(200).json({ message: 'Step added' });
    } catch (error) {
      console.error('Error adding step:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export default {
    getUsername,
    addGoal,
    getGoals,
    addStep,
  };

