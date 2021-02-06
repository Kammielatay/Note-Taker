const fs = require("fs");
const { get } = require("http");
//const notes = require("../db/db.json");
var uniqid = require("uniqid");

function getNotes() {
  let notes = fs.readFileSync("./db/db.json", 'utf8') 
  return JSON.parse(notes);
}

module.exports = (app) => {

  app.get("/api/notes", function (req, res) {
    // This is using the getNotes function to read the db.json file 
    let allNotes= getNotes()
    res.json(allNotes)
  })

  app.post("/api/notes", function (req, res) {
    // getting the new note and giving it a unique id
    let newNote = req.body;
    newNote.id = uniqid();

    // This is reading all the notes from the db.json file and pushing our new note every time
    let iNeedMyNotes = getNotes();
    iNeedMyNotes.push(newNote);

   // This is writing the file and sending back the request
    fs.writeFile("./db/db.json", JSON.stringify(iNeedMyNotes), "utf8", function (err) {
      if (err) throw err;
      res.send(req.body);
  });
})

  app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
  })

}