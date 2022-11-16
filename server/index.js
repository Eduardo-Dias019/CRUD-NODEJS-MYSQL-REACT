require("dotenv").config()
const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");

const dbPass = process.env.DB_PASS;



const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: dbPass,
  database: "crudgames",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const {name} = req.body;
    const {cost} = req.body;
    const {category} = req.body;

    let sql = "INSERT INTO games ( game, cost, category ) VALUES ( ?, ?, ? )"

    db.query(sql, [name, cost, category],(err, result) => {
        console.log(err)
    })
})

app.get("/getCards", (req, res) =>{

  let sql = "SELECT * from games";

  db.query(sql, (err, result) =>{
    if(err) console.log(err)
    else res.send(result)
  })

})

app.put("/edit", (req, res) => {
  const {id} = req.body;
  const {name} = req.body;
  const {cost} = req.body;
  const {category} = req.body;

  let sql = "UPDATE games SET game = ?, cost = ?, category = ? WHERE idgames = ?";

  db.query(sql, [name, cost, category, id], (err, result) => {
    if(err) console.log(err)
    else res.send(result)
  })
})

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let SQL = "DELETE FROM games WHERE idgames = ?";
  db.query(SQL, [id], (err, result) => {
      if(err) console.log(err);
      else res.send(result);
  })
});

app.listen(3001, () => {
  console.log("rodando o servidor!");
});
