const fs = require("fs");
var path = require("path");
var uniqid = require("uniqid");

function getNotes() {
  let notes = fs.readFileSync("./db/db.json", 'utf8') 
  return JSON.parse(notes);
}

module.exports = (app) => {
// This is to get all the notes from the db.json file

  app.get("/api/notes", function (req, res) {
    // This is using the getNotes function to read the db.json file 
    let allNotes= getNotes()
    res.json(allNotes)
  })

// This is the post method the notes

  app.post("/api/notes", function (req, res) {
    // getting the new note and giving it a unique id
    let newNote = req.body;
    newNote.id = uniqid();

    // This is reading all the notes from the db.json file and pushing our new note every time
    let allNotes = getNotes();
    allNotes.push(newNote);

   // This is writing the file and sending back the request
    fs.writeFile("./db/db.json", JSON.stringify(allNotes), "utf8", function (err) {
      if (err) throw err;
      res.send(req.body);
  });
})

// This is to delete an item from the array

  app.delete('/api/notes/:id', function (req, res) {
    
    let allNotes = getNotes()
    let noteId = req.params.id;

    var filterNotes = allNotes.filter(note => note.id !== noteId);
  
    fs.writeFile(path.join("./db/db.json"), JSON.stringify(filterNotes), err => {
      if (err) throw err;
      res.json(filterNotes);
    });

  })

}