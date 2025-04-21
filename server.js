const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: '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', // Replace this with your real OpenAI API key
});

app.post('/api/gpt', async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
