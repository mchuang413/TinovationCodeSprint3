import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

//create post req to gpt
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
        //returns message as
        message: response
    });
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
