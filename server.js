const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: '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'
});

app.post('/api/gpt', async (req, res) => {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);
  
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });
  
      res.json({ result: completion.choices[0].message.content });
    } catch (err) {
        console.error("Error during GPT request:", err.response?.data || err.message || err);
        res.status(500).json({ error: 'Something went wrong with OpenAI' });
      }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
