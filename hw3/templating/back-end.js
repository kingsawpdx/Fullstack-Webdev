const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "pug");

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/capitals", async (req, res) => {
  try {
    const query = await axios.get("https://restcountries.com/v3.1/all");
    query.data.forEach(function (country) {
      if (!country.capital) {
        country.capital = "no data";
      }
    });
    const sortedCountries = query.data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    res.render("capitals", { countries: sortedCountries });
  } catch (error) {
    console.error("Error fetching capital data:", error);
    res.status(500).send("An error occurred while fetching capital data.");
  }
});

app.get("/populous", async (req, res) => {
  try {
    const query = await axios.get("https://restcountries.com/v3.1/all");
    const sortedCountriesWith50Mil = [];
    query.data.forEach(function (country) {
      if (country.population >= 50000000) {
        sortedCountriesWith50Mil.push(country);
      }
    });
    sortedCountriesWith50Mil.sort((a, b) => b.population - a.population);
    res.render("populous", { countries: sortedCountriesWith50Mil });
  } catch (error) {
    console.error("Error fetching populous data:", error);
    res.status(500).send("An error occurred while fetching populous data.");
  }
});

app.get("/regions", async (req, res) => {
  try {
    const query = await axios.get("https://restcountries.com/v3.1/all");
    const countries = [];
    query.data.forEach(function (country) {
      const countryInArray = countries.find((c) => c.region === country.region);
      if (countryInArray) {
        countryInArray.occurance += 1;
      } else {
        countries.push({ region: country.region, occurance: 1 });
      }
    });
    countries.sort((a, b) => b.occurance - a.occurance);
    res.render("regions", { regions: countries });
  } catch (error) {
    console.error("Error fetching region data:", error);
    res.status(500).send("An error occurred while fetching region data.");
  }
});

app.get("/", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send("HW3");
});

app.listen(3000, () => {
  console.log("Listending on port 3000...");
});
