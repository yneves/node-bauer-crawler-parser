/*!
**  bauer-crawler-scrape -- Plugin for bauer-crawler to scrape content.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-scrape>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var path = require("path");
var dom = require("bauer-dom");
var Cache = require("bauer-cache");
var merge = require("lodash/object/merge");

// - -------------------------------------------------------------------- - //

module.exports = function(worker,config) {
  
  worker.on("request",function(options,response) {
    
    var input = new Cache({
      file: options.source
    });
    
    var output = new Cache(merge(config.cache,options.cache,{
      file: {
        name: path.basename(input.getFile())
      }
    }));
    
    output.exists(function(error,exists) {
      if (error) {
        response.sendError(error);
        
      } else if (exists) {
        
        output.expired(function(error,expired) {
          if (error) {
            response.sendError(error);
            
          // cache expired, make http request
          } else if (expired) {
            
            doScrape(input,output,options,response);
            
          // reuse cache
          } else {
            response.sendOk({
              file: output.getFile()
            });
          }
        });
          
      // cache does not exists, make http request
      } else {
        
        doScrape(input,output,options,response);
        
      }
    });
    
  });
  
  worker.send({ ready: true });
  
};

// - -------------------------------------------------------------------- - //

function doScrape(input,output,options,response) {

  input.exists(function(error,exists) {
    if (error) {
      response.sendError(error);
      
    } else if (exists) {
      input.read(function(error,content) {
        if (error) {
          response.sendError(error);
        } else {
          
          var data;
          try {
            data = dom(content).scrape(options.scrape);
          } catch(e) {
            error = e;
          }
          
          if (error) {
            response.sendError(error);
          } else {
            
            output.write(data,function(error) {
              if (error) {
                response.sendError(error);
              } else {
                
                response.sendOk({
                  file: output.getFile()
                });
                
              }
            });
          }
        }
      });
      
    } else {
      response.sendError(new Error("input not found"));
    }
  });
}
