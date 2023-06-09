import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Robot10#",
    database: "crud"
})

app.get('/', (req, res) => {
    const sql = "select * from student";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server "+ err});
        return res.json(result)
    })
})

app.post('/student', (req, res) => {
    const sql = "insert into student (`name`, `email`) values (?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result)
    })
})

app.get('/read/:id', (req, res) => {
    const sql = "select * from student where id = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result) => {
        if(err) return res.json({Message: "Error inside server "+ err});
        return res.json(result)
    })
})

app.put('/update/:id', (req,res) => {
    const sql = 'update student set `name`=?, `email`=? where id=?';
    const id = req.params.id
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if(err) return res.json({message: "Error inside server "+ err});
        return res.json(result);
    })
})

app.delete('/delete/:id', (req, res) => {
    const sql = "delete from student where id = ?"
    const id = req.params.id;
    db.query(sql,[id], (err, result) => {
        if(err) return res.json({message: "Error inside server "+ err});
        return res.json(result);
    })
})

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','*');
});

app.listen(3001, ()=> {
    console.log("Listening")
})