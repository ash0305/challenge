// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configure middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/coding-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define data model for code snippets
const snippetSchema = new mongoose.Schema({
  title: String,
  language: String,
  code: String,
});

const Snippet = mongoose.model('Snippet', snippetSchema);

// Define RESTful APIs for CRUD operations for code snippets
app.get('/api/snippets', async (req, res) => {
  const snippets = await Snippet.find();
  res.json(snippets);
});

app.get('/api/snippets/:id', async (req, res) => {
  const snippet = await Snippet.findById(req.params.id);
  res.json(snippet);
});

app.post('/api/snippets', async (req, res) => {
  const { title, language, code } = req.body;

  // Validate input data
  if (!title || !language || !code) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const snippet = new Snippet({ title, language, code });
  await snippet.save();
  res.json(snippet);
});

app.put('/api/snippets/:id', async (req, res) => {
  const { title, language, code } = req.body;

  // Validate input data
  if (!title || !language || !code) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const snippet = await Snippet.findByIdAndUpdate(req.params.id, {
    title,
    language,
    code,
  });
  res.json(snippet);
});

app.delete('/api/snippets/:id', async (req, res) => {
  await Snippet.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

