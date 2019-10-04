const express = require('express');
const scrapper = require('../utils/utils');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('got request');
});

router.post('/scrape', (req, res, next) => {
  let scrapeParams = req.body;

  scrapper(scrapeParams.url, res)
});

module.exports = router;
