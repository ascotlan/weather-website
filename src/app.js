const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000; // set port number as host port# assigned or 3000 if no host port# assigned

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)));

// Setup routing using express
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Antonio Scotland",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Antonio Scotland",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: " This is the help page.",
    title: "Help",
    name: "Antonio Scotland",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help article not found.",
    title: "404",
    name: "Antonio Scotland",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not found.",
    title: "404",
    name: "Antonio Scotland",
  });
});

// Set up the web server to listen on port 3000
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
