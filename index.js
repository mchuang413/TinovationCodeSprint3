import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const openai = new OpenAI({
    apiKey: "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",
});


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/", async (req, res) => {
    
    const personaPrompt = "The following is a message by a weak human. \n Please respond in an anrgy, complex, and mad way. Also make sure to throw in an insult to test the waters. Please make it short and witty too. Human: ";

    const { message } = req.body;
    console.log(message);

    
    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {role: 'user', content: personaPrompt + message}],
    });

    const response = chatCompletion.choices[0].message.content;

    res.json({
        message: response
    });
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
