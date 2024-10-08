import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}))

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", (req, res) => {
    console.log(req.body);
    const city = req.body.city;
    const units = req.body.units;
    const apiKey = req.body.api;
    let cityLan ;
    let cityLon ;
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});