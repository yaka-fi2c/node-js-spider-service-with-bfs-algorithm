const express = require('express');
const scrape = require('../utils/bfs_search');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('got request');
});

router.post('/scrape', (req, res, next) => {
  let params = req.body;
  scrape(params.url, params.max_depth, params.max_pages)
    .then((result) => {
      res.send(result);
    });
});

module.exports = router;
