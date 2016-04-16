/*!
**  bauer-plugin-scrape -- Plugin for bauer-crawler to scrape content.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-plugin-scrape>
*/
// - -------------------------------------------------------------------- - //

'use strict';

var path = require('path');
var dom = require('bauer-dom');
var Cache = require('bauer-cache');
var factory = require('bauer-factory');

// - -------------------------------------------------------------------- - //

module.exports = function (worker,config) {

  worker.on('request', function (options,response) {

    var input = new Cache({ file: options.source });

    var outputFile = { file: { name: path.basename(input.getFile()) } };
    var outputOptions = factory.merge(options.cache, outputFile, config.cache);
    var output = new Cache(outputOptions);

    output.validate(function (error,valid) {
      if (error) {
        response.sendError(error);
      } else if (valid) {
        response.sendOk({ file: output.getFile() });
      } else {

        input.exists(function (error,exists) {
          if (error) {
            response.sendError(error);
          } else if (exists) {
            input.read(function (error,content) {
              if (error) {
                response.sendError(error);
              } else {

                var data = dom(content).scrape(options.scrape);

                output.write(data, function (error) {
                  if (error) {
                    response.sendError(error);
                  } else {
                    response.sendOk({ file: output.getFile() });
                  }
                });
              }
            });
          } else {
            response.sendError(new Error('input not found'));
          }
        });
      }
    });
  });

  worker.sendReady();

};

// - -------------------------------------------------------------------- - //
