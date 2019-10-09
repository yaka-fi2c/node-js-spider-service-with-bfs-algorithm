const express = require('express');
const router = express.Router();

const scrape = require('../utils/bfs_search');

router.post('/scrape', (req, res, next) => {
  // remove default time out of 2 minutes
  req.setTimeout(0);
  // decunstruct params from the request
  let { url, max_depth, max_pages } = req.body;
  // run BFS algorithm function and send back to the client
  scrape(url, max_depth, max_pages)
    .then((result) => {
      res.send(result);
    })
    .catch(err => res.send(err));
});

module.exports = router;
