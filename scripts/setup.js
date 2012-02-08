#!/usr/bin/env node


var util = require('util');
var async = require('async');
var notesdb = require('../lib/model');

notesdb.connect(function(error){
    if(error)
        throw error;
});
    

async.series([
    function(cb){
        notesdb.add("Lorem Ipsum ", "Crasmetus.Sed aliquest risus a tortor. Siansdlf Bo has tL asdf hi asdfalsdf ",function(error){
            if(error){
                util.log('ERROR ' + error);
                cb(error);
                return;
            }

            cb();
        });
    }
],
    function(error, results){
        if(error){
            util.log('ERROR ' + error);
            notesdb.disconnect(function(err) { });
        }

        util.log("setup complete...");

        process.exit();
    }
);




    

