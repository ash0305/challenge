const express = require('express');
const router = express.Router();

const CodeSnippet = require('../models/codeSnippet');

// Get all code snippets
router.get('/', async (req, res) => {
  try {
    const codeSnippets = await CodeSnippet.find();
    res.json(codeSnippets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one code snippet
router.get('/:id', getCodeSnippet, (req, res) => {
  res.json(res.codeSnippet);
});

// Create a code snippet
router.post('/', async (req, res) => {
  const codeSnippet = new CodeSnippet({
    title: req.body.title,
    language: req.body.language,
    code: req.body.code,
  });

  try {
    const newCodeSnippet = await codeSnippet.save();
    res.status(201).json(newCodeSnippet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a code snippet
router.patch('/:id', getCodeSnippet, async (req, res) => {
  if (req.body.title != null) {
    res.codeSnippet.title = req.body.title;
  }

  if (req.body.language != null) {
    res.codeSnippet.language = req.body.language;
  }

  if (req.body.code != null) {
    res.codeSnippet.code = req.body.code;
  }}