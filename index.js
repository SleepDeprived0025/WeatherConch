import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use("/static", express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("index.ejs", {
		apiKey: null,
	});
});

app.post("/", (req, res) => {
	console.log(req.body);
	const city = req.body.city;
	const units = req.body.units;
	const apiKey = req.body.api;
	let cityLan;
	let cityLon;
	try {
		const locationResponse = axios
			.get(
				`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
			)
			.then((response) => {
				console.log(response.data[0].lat, response.data[0].lon);
				cityLan = response.data[0].lat;
				cityLon = response.data[0].lon;
				return axios
					.get(
						`https://api.openweathermap.org/data/2.5/weather?lat=${cityLan}&lon=${cityLon}&units=${units}&appid=${apiKey}`
					)
					.then((response) => {
						res.render("index.ejs", {
							city: response.data.name,
							temp: Math.round(response.data.main.temp),
							realTemp: Math.round(response.data.main.feels_like),
							desc: response.data.weather[0].description,
							icon:
								"http://openweathermap.org/img/wn/" +
								response.data.weather[0].icon +
								"@2x.png",
							metricUnit: units,
						});
					});
			});
	} catch (error) {
		console.log(error);
	}
});

app.post("/reset", (req, res) => {
	res.render("index.ejs", {
		apiKey: null,
	});
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
