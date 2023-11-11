import { Configuration, OpenAIApi } from 'openai';
import { writeFileSync } from 'fs';

const configuration = new Configuration ({
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const prompt = 'a ship sailing through a river of fire in deep space'

const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
});

const url = result.data.data[0].url;
console.log(url);

const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from( await blob.arrayBuffer() )
writeFileSync(`./web/assets/${Date.now()}.png`, buffer);