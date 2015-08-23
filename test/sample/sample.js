// - -------------------------------------------------------------------- - //

"use strict";

var fs = require("fs");
var assert = require("assert");
var Crawler = require("bauer-crawler");

var crawler = new Crawler({
  config: {
    scrape: {
      cache: {
        file: {
          dir: __dirname
        }
      }
    }
  }
});

crawler.loadPlugin(__dirname + "/../../");

crawler.start(function() {
  
  return this.promise()
    .scrape(__dirname + "/sample.html",{
      "head > title": {
        title: "text",
      },
      "[id]": {
        ids: {
          "a[href][title]": {
            url: "attr:href",
            title: "attr:title"
          }
        }
      }
    })
    .then(function(file) {
      var output = JSON.parse(fs.readFileSync(file).toString());
      var compare = JSON.parse(fs.readFileSync(__dirname + "/sample.json").toString());
      assert.deepEqual(output,compare);
      fs.unlinkSync(file);
    });
});

// - -------------------------------------------------------------------- - //
