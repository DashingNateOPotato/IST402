const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

// Initialize Express app
const app = express();
app.use(cors());  // Enable CORS
app.use(express.json());  // For parsing JSON requests

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: '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'  // Replace with your OpenAI API key
});

// Define the /api/gpt route to handle requests
app.post('/api/gpt', async (req, res) => {
    const { prompt } = req.body;

    try {
        // Send prompt to GPT-4 for a response
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
        });

        const result = completion.choices[0].message.content;
        res.json({ result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to contact OpenAI' });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});