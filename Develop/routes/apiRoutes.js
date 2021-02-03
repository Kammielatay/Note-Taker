const fs = require("fs");
const notes = require("../db/db.json");


module.exports = (app) => {

  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    let newNote = req.body
    notes.push(newNote);
   
    fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", function (err) {
      if (err) throw err;
      res.json(req.body);
  });
})

  app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
  })

}