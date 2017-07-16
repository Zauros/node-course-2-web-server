const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine","hbs");
app.use(express.static(__dirname+"/public"));
app.use((req,res,next)=>{
  var now =new Date().toString();
  var log ="time "+ now+" "+req.method +" "+req.url;
  fs.appendFile("server.log",log+"\n",(err)=>{if(err){console.log("unable write a file");}});
  next();
});
hbs.registerHelper("screamIt",(text)=>{
  return text.toUpperCase();
});
hbs.registerHelper("getCurrentYear",()=>{
  return new Date().getFullYear();
});
app.get("/",(req,res)=>{
  res.render("home.hbs",{pageTitle:"questa e la homepage",pageBody:"questa è il corpo della pagina principale"});
});
app.get("/portfolio",(req,res)=>{
  res.render("portfolio",{pageTitle:"Portfolio Page",pageBody:"Questa pagina è una sorta di vetrina per i tuoi progetti"});
});
app.get("/about",(req,res) =>{
  res.render("about.hbs",{
    pageTitle: "About Page"
  });
});
app.get("/bad",(req,res) =>{
  res.send({errorMessage:"not ok"});
});

app.listen(port,()=>{
  console.log("example app listeing on port ",port);
});
