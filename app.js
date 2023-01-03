const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.sendFile(__dirname+"/index.html") 
})

app.post('/', (req, res) => {
  let chunks = []
  const query = req.body.cityName
  const url =
    "https://api.openweathermap.org/data/2.5/forecast?q="+query+"&appid=0c105c4027bd5b1dda38ce1c8cd64c3c#";
  https.get(url, (response) => {
    response.on("data", (data) => {
      chunks.push(data)
    }).on('end', () => {
      let data = Buffer.concat(chunks);
      const weatherData = JSON.parse(data);
      const weatherDiscreption = weatherData.list[0].weather[0].description;
      const temperature = weatherData.list[0].main.temp;
      const icon = weatherData.list[0].weather[0].icon;
      const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(`<h1>weather in ${query} is ${weatherDiscreption}`);
      res.write(`<h2>the temperature is ${temperature}</h2>`);
      res.write("<img src=" + iconUrl + " />");
      res.send();
    });
  });
})


app.listen(3000, () => {
    console.log("server is running at post 3000.");
})