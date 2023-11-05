import dotenv from 'dotenv';
import client from '../db.js';
import { ObjectId } from 'mongodb';

dotenv.config();


const paySuccess = async (req, res) => {
    const event = req.body;

    switch (event.type) {
        case 'checkout.session.completed': {
            const paymentIntent = event.data.object;
            const clientReferenceId = paymentIntent.client_reference_id;
            const [userId, diamondsToAdd] = clientReferenceId.split('-').map(value => String(value));
            console.log(userId, diamondsToAdd);
            try {
                const userIdObject = ObjectId.createFromHexString(userId);
                const database = client.db('db1');
                const goalsCollection = database.collection('goals');
                const currentDiamonds = await getDiamonds(req, res);
                if (userGoals) {
                    const updatedDiamonds = (currentDiamonds || 0) + parseInt(diamondsToAdd);
                    console.log(currentDiamonds);
                    await goalsCollection.updateOne(
                        { userId: userIdObject },
                        { $set: { diamonds: updatedDiamonds } }
                    );
                    console.log(`Added ${diamondsToAdd} diamonds to the user's account.`);
                } else {
                    console.log('User goals not found');
                }
            } catch (error) {
                console.error('Error updating diamonds:', error);
            }
            break;
        }
        default: {
            console.log(`Received event of type: ${event.type}`);
        }
    }

    res.status(200).end();
};



const getDiamonds = async (req, res) => {
    try {
        const userId = ObjectId.createFromHexString(req.session.userId);
        const database = client.db('db1');
        const goalsCollection = database.collection('goals');
        const userGoals = await goalsCollection.findOne({ userId });

        if (userGoals && userGoals.diamonds !== undefined) {
            const diamonds = userGoals.diamonds;
            res.status(200).json({ diamonds });
        } else {
            res.status(200).json({ diamonds: 0 });
        }
    } catch (error) {
        console.error('Error fetching diamonds:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateDiamonds = async (req, res) => {
    const { diamonds } = req.body;
    try {
        const userId = ObjectId.createFromHexString(req.session.userId);
        const database = client.db('db1');
        const goalsCollection = database.collection('goals');
        
        await goalsCollection.updateOne(
            { userId },
            { $set: { diamonds: diamonds } }
        );
      } catch (error) {
        console.error('error fetching diamonds:', error);
        res.status(500).json({ error: 'internal server error' });
      }
}
 
export default {
    getDiamonds,
    paySuccess,
    updateDiamonds
};

