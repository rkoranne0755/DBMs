
var con = require('./connection')
var express = require("express")
var bodyParser = require('body-parser')

var app = express()
app.listen(3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))

app.set('view engine', 'ejs');

app.get('/',(req, res)=>{
    res.sendFile(__dirname+"/register.html")
})

app.post('/',(req,res)=>{
    emp = req.body.ename
    age = req.body.age
    mno = req.body.mno
    jrole = req.body.jrole

    var sql = `insert into employee(ename, age, mno, jrole) values (?, ?, ?, ?)`

    con.query(sql,[emp, age, mno, jrole],(err,result)=>{
        if(err) console.log(err);
        // else res.send("Employee Registered Succesfully With I'd " + result.insertId)
        res.redirect('/employee')
    })
})

app.get('/employee',(req,res)=>{

    var sql = `select * from employee`
    con.query(sql,(err, result)=>{
        if(err) console.log(err);
        console.log(result);
        res.render(__dirname+"/employee",{employee:result})
        // console.log(result[0].id);
    })

})


con.connect((err)=>{
    if(err) console.log(err);
    else console.log("Connected Succesfully!!!");
})
