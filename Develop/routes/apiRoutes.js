const fs = require("fs");
var path = require("path");
var uniqid = require("uniqid");

function getNotes() {
  let notes = fs.readFileSync("Develop/db/db.json", 'utf8') 
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
    let allNotes = getNotes();
    allNotes.push(newNote);

   // This is writing the file and sending back the request
    fs.writeFile("Develop/db/db.json", JSON.stringify(allNotes), "utf8", function (err) {
      if (err) throw err;
      res.send(req.body);
  });
})


  app.delete('/api/notes/:id', function (req, res) {
    // getting all notes and the note params
    let allNotes = getNotes()
    let noteId = req.params.id;
    
    // this is filtering through each note and finding the note that does not match the id so that it can be saved to the db.json
    var filterNotes = allNotes.filter(note => note.id !== noteId);
  
    fs.writeFile(path.join("Develop/db/db.json"), JSON.stringify(filterNotes), err => {
      if (err) throw err;
      res.json(filterNotes);
    });

  })

}