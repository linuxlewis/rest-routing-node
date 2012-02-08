var util = require('util');
var url = require('url');
var express = require('express');

var notesdb = require('./model');

var app = express.createServer();

app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use('/assets',express.static(__dirname + '/assets'));
app.register('.html', require('ejs'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(app.router);

var parseUrlParams = function(req, res, next){
    req.urlP = url.parse(req.url, true);
    next();
}

notesdb.connect(function(error){
    if(error) throw error;
});

app.on('close', function(errno){
    notesdb.disconnect(function(err) { });
});

app.get('/', function(req, res){
    res.redirect('/note');
});

app.get('/note', function(req, res){
    notesdb.allNotes(function(err, notes){
        if(err){
            util.log('ERROR ' + err);
            throw err;
        }
        else{
            res.render('index.html', { title: "Notes Mongo", notes:notes });
        }
    });
});

app.get('/note/new', function(req, res){
    res.render('new.html', { title: "Notes Mongo", postpath: '/note', note: notesdb.emptyNote});
});

app.post('/note', function(req, res){
    notesdb.add(req.body.note.author, req.body.note.note, function(error){
        if(error) throw error;
        res.redirect('/note');
    });
});

app.del('/note/:id', function(req, res){
    notesdb.delete(req.params.id, function(error){
        if(error) throw error;
        res.redirect('/note');
    });
});

app.put('/note/:id', function(req, res){
    notesdb.edit(req.params.id, req.body.author, req.body.note, function(error){
        if(error) throw error;
        res.redirect('/note');
    });
});

app.get('/note/:id/edit', function(req, res){
    notesdb.findNoteById(req.params.id, function(error, note){
        if(error) throw error;
        res.render('edit.html', { title: "Notes Mongo", postpath: "/note/"+req.params.id, note:note });
    });
});

app.listen(1337);
