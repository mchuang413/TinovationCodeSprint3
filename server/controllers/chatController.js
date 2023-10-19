import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const processMessage = async (req, res) => {
    try {
        const { message } = req.body;
        console.log(message);

        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: message },
            ],
        });

        const response = chatCompletion.choices[0].message.content;

        res.json({
            message: response,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default {
    processMessage,
};