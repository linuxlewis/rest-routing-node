var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dburl = 'mongodb://localhost/noteDB';

exports.connect = function(callback){
    mongoose.connect(dburl);
}

exports.disconnect = function(callback){
    mongoose.disconnect(callback);
}

exports.setup = function(callback){
    callback(null);
}

var NoteSchema = new Schema({
    ts : { type: Date, default: Date.now },
    author : String,
    note : String
});

mongoose.model('Note', NoteSchema);
var Note = mongoose.model('Note');
exports.emptyNote = { "_id": "", author: "", note: "" };

exports.add = function(author, note, callback){
    var newNote = new Note();
    newNote.author = author;
    newNote.note = note;
    newNote.save(function(err){

        if(err){
            util.log('FATAL ' + err);
            callback(err);
        }
        else{
            callback(null);
        }
    });
}

exports.delete = function(id, callback){
    exports.findNoteById(id, function(err, doc){
        if(err){
            callback(err);
        }
        else{
            util.log(util.inspect(doc));
            doc.remove();
            callback(null);
        }
    });
}

exports.edit = function(id, author, note, callback){
    exports.findNoteById(id, function(err, doc){
        if(err){
            callback(err);
        }
        else {
            doc.ts = new Date();
            doc.author = author;
            doc.note = note;
            doc.save = (function(err) {
                if(err){
                    util.log('FATAL ' + err);
                    callback(err)
                }
                else{
                    callback(null);
                }
            });
        }
    });
}

exports.allNotes = function(callback){
    Note.find({}, callback);
}

exports.forAll = function(doEach, done){
    Note.find({}, function(err, docs){
        if(err){
            util.log('FATAL '+ err);
            done(err, null);
        }
        docs.forEach(function(doc){
            doEach(null, doc);
        });
        done(null);
    });
}

var findNoteById = exports.findNoteById = function(id, callback){
    Note.findOne({"_id": id }, function(err, doc){
        if(err){
            util.log('FATAL ' + err);
            callback(err, null);
        }
        callback(null, doc);
    });
}

