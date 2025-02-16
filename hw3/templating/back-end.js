const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "pug");

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/capitals", async (req, res) => {
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
});

app.get("/populous", async (req, res) => {
  const query = await axios.get("https://restcountries.com/v3.1/all");
  const sortedCountriesWith50Mil = [];
  query.data.forEach(function (country) {
    if (country.population >= 50000000) {
      sortedCountriesWith50Mil.push(country);
    }
  });
  sortedCountriesWith50Mil.sort((a, b) => b.population - a.population);
  res.render("populous", { countries: sortedCountriesWith50Mil });
});

app.get("/regions", async (req, res) => {
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
});

app.listen(3000, () => {
  console.log("Listending on port 3000...");
});
