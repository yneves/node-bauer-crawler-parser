/*!
**  bauer-crawler-scrape -- Plugin for bauer-crawler to scrape content.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-scrape>
*/
// - -------------------------------------------------------------------- - //

"use strict";

// - -------------------------------------------------------------------- - //

module.exports = {
  
  scrape: {
    
    // .scrape(scrape Object) :Promise
    o: function(scrape) {
      return this.then(function(source) {
        return this.promise().scrape(source,scrape);
      });
    },
    
    // .scrape(source String, scrape Object) :Promise
    so: function(source,scrape) {
      return this.then(function() {
        return this.requestWorker("scrape",{
          source: source,
          scrape: scrape
        }).get('file');
      });
    }
    
  }
      
};

// - -------------------------------------------------------------------- - //
