var request = require('request');
var express = require('express');
var app = express();
var ejs = require('ejs');
app.set("view engine", "ejs");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

var port =3000;

app.get("/",function(req,res){
	res.sendFile(__dirname+"/public/index.html");
});

app.get("/search",function(req,res){
	var key = req.query.search;
	request("http://api.giphy.com/v1/gifs/search?q="+key+"&api_key=dc6zaTOxFJmzC",function(err,response,body){
		var Jbody =JSON.parse(body).data;
		var embedUrl = Jbody.map(function(gif){return gif.images.fixed_height.url});

		res.render("giphy.ejs",{key:key, gifs:embedUrl, pin:false });
	});
});

app.post('/saved',function(req,res){
	var saved = req.body.mark;
	console.log(req.body);
	res.render("bookmark.ejs",{bookmark:saved});
});

app.listen(port, function(){
	console.log("listening on "+port);
});
