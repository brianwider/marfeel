// External modules
const { Router } = require('express');
const mockedData = require('./mock.json');
const api = new Router();

api.get('/graphs', (req, res) => {
  res.json(mockedData);
});

module.exports = api;
