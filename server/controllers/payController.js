import dotenv from 'dotenv';
import client from '../db.js';
import { ObjectId } from 'mongodb';

dotenv.config();


const paySuccess = async (req, res) => {
    const event = req.body;
    
    switch (event.type) {
        case 'checkout.session.completed': {
            const paymentIntent = event.data.object;
            const productId = paymentIntent.client_reference_id;
            let diamondsToAdd = 0;
            switch (productId) {
                case 'michael-fix-the-switches-on-dashboard':
                    diamondsToAdd = 100;
                    break;
                case 'standard_product_id':
                    diamondsToAdd = 500;
                    break;
                case 'premium_product_id':
                    diamondsToAdd = 1000;
                    break;
                default:
                    diamondsToAdd = 0;
            } 
            // try{
            //     const userId = ObjectId.createFromHexString(req.session.userId);
            //     const database = client.db('db1');
            //     const goalsCollection = database.collection('goals');
            //     const userGoals = await goalsCollection.findOne({ userId });
                
            // }catch(error){
            //     console.error('Error:', error);
            // }

            console.log(`Added ${diamondsToAdd} diamonds to the user's account.`);
            break;
        }
        default: {
            console.log(`Received event of type: ${event.type}`);
        }
    }

    res.status(200).end();
};


const getDiamonds = async (req, res) => {
}

export default {
    getDiamonds,
    paySuccess,
};

