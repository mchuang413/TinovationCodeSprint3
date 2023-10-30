import {Stripe} from 'stripe';
import dotenv from 'dotenv';
import client from '../db.js';
import bodyParser from 'body-parser';

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const paySuccess = (req, res) => {
    const event = req.body;
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            const productId = paymentIntent.id;

            let diamondsToAdd = 0;
            switch (productId) {
                case 'pm_1O3sBcDmetiXZalSqPYLhIXL':
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

            console.log(`Added ${diamondsToAdd} diamonds to the user's account.`);
            break;
        }
        default: {
            console.log(`Received event of type: ${event.type}`);
        }
    }

    res.status(200).end();
};
const setDiamonds = async (req, res) => {
}

const getDiamonds = async (req, res) => {
}

export default {
    setDiamonds,
    getDiamonds,
    paySuccess,
};

