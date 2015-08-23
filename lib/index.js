/*!
**  bauer-crawler-scrape -- Plugin for bauer-crawler to scrape content.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-scrape>
*/
// - -------------------------------------------------------------------- - //

"use strict";

module.exports = {
  
  name: "scrape",
  
  config: {
    workers: 1,
    cache: {
      json: true,
      expires: 0,
      file: {
        dir: ".",
        ext: "json"
      }
    }
  },
  
  worker: __dirname + "/worker.js",
  promise: __dirname + "/promise.js"
  
};

// - -------------------------------------------------------------------- - //
