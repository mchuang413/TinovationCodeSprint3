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
    
    const { message } = req.body;
    console.log(message);

    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {role: 'user', content: message}],
    });

    const response = chatCompletion.choices[0].message.content;

    res.json({
        message: response
    });
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
