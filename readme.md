#REST routing with node#
### Installation ###
This example depends on express, async, ejs, and mongoose. You'll need to install those node modules to make it work. First, create a new directory.

    mkdir project_dir
    cd project_dir
    git init
    git pull git@github.com:linuxlewis/rest-routing-node.git

The next part assumes you have mongoDB installed. Google "mongoDB quickstart" for a good installation guide.
Start your mongoDB server

    ./mongod

Run lib/setup.js with node. This will connect to the database and create the Note model.

    node scripts/setup.js
    setup complete...

If you see the "setup complete..." then it completed successfully. You can now hit ctrl-C and run the main application

    node lib/app.js

The application is now running at localhost:1337. Type the address into your browser and check it out


### About ###

This example shows how to do REST resource routing with Nodejs and express web framework.
The following routes are available

* GET /note - index of notes
* GET /note/new - new note form
* POST /note - create new note
* GET /note/:id/edit - edit note form
* PUT /note/:id - save note edits
* DELETE /note/:id - delete note

### Change log###
#### version 0.1 ####
* correct package.json
* updated project format

### TODO ###

#### version 0.2 ####
* Nested collections
* form_for helper



