const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req,res){
    
    res.sendFile(__dirname + "/index.html");



})

app.post("/", function(req, res){
    console.log("Post request recieved.");
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const apikey ="bd85cc8d825224394623747968f3a954";
    const unit = "metric";
    url="https://api.openweathermap.org/data/2.5/weather?q=" +query + "&appid=" +apikey+ "&units=" + unit

    https.get(url,function(response){

 
        console.log(response.statusCode);

        response.on("data", function(data){

            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temp = weatherData.main.temp;

            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);

            const icon = weatherData.weather[0].icon;
            console.log(icon);
            const imageURL ="https://openweathermap.org/img/wn/"+ icon + "@2x.png"
            res.write("<p>The weather description is " + weatherDescription + " </p>")
            res.write("<h1>The current temperature of London is" + temp + " celcious.</h1>" )
            res.write("<img src = "+ imageURL + "></img>")
            res.send()
        })



    })



})










app.listen(3000 ,function(){
    console.log("The server is running on the port 3000");
})