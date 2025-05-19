import express from "express";
import bodyParser from "body-parser";
import request from "request";

const app = express();
const port = 3000;
const apiKey = "4c53b37cb82b5e703b35f0915cfc950d";



app.use(express.static('public'));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index", {weather: null, error: null});
});

app.post("/", (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    request(url, function(err, response, body){
        if(err){
            res.render('index', {weather: null, error: 'error, try again'});
        }
    
        else{
            let weather = JSON.parse(body);
            if(weather.main === undefined){
                res.render("index", {weather: null, error: "error, try again"});
            } else {
                let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render("index", {weather: message, error: null});
            }
        }
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});