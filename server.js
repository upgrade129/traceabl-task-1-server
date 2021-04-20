const express = require('express');
const app =express();
const mysql = require('mysql');
const cors = require('cors');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database: "test"
})

app.use(express.json());
app.use(cors());

app.post('/signup',(request,response)=>{

    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email;
    
    var sql = `INSERT INTO user (username, email, password) VALUES ('${username}', '${email}','${password}');`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });

    response.send(`${username} created`);
})

app.post('/comments',(request,response)=>{

  var username = request.body.username;
  var comments = request.body.comments
  
  var sql = `INSERT INTO comment (username, comments) VALUES ('${username}', '${comments}');`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });

  response.send(`${username}'s comment created`);
})



app.post('/login', function(request, response){
    var email = request.body.username;
    var password = request.body.password;

    con.query(`SELECT * FROM user WHERE email = "${email}" AND password = "${password}"`, function (err, result) {
      console.log(result.length);
      if(result.length > 0){
        console.log(result.username);
        response.send(result[0]);    // echo the result back
      }
      else{
        response.send(false)
      }
      if (err) throw err;
    });
    
    console.log(request.body);      // your JSON
  });

  app.get('/users', function(request, response){
    
    con.query(`SELECT * FROM user`, function (err, result) {
      console.log(result.length);
      response.send(result);    // echo the result back
      
      if (err) throw err;
    });
    
        // your JSON
  });

  app.get('/comments', function(request, response){
    
    con.query(`SELECT * FROM comment`, function (err, result) {
      console.log(result.length);
      response.send(result);    // echo the result back
      
      if (err) throw err;
    });
    
        // your JSON
  });




const port = process.env.PORT || 4200;

app.listen(port , ()=>{
    console.log("App is Listening on the port : ",port);
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
})