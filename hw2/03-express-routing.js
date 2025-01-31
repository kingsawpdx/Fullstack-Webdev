const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const routes = [
  "welcome",
  "redirect",
  "redirected",
  "cache",
  "cookie",
  "other",
];

app.get("/welcome", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send(`
    <html>
      <head><title>Welcome Page</title></head>
      <body>
        <h1>Welcome to this page!</h1>
      </body>
    </html>
  `);
});

app.get("/redirect", (req, res) => {
  res.redirect("/redirected");
});

app.get("/redirected", (req, res) => {
  res.send(`
    <html>
      <head><title>Redirected Page</title></head>
      <body>
        <h1>You have been redirected!</h1>
      </body>
    </html>
  `);
});

app.get("/cache", (req, res) => {
  res.set("Cache-Control", "public, max-age=86400");
  res.send(`
    <html>
      <head><title>Cached Response</title></head>
      <body>
        <h1>This resource was cached</h1>
      </body>
    </html>
  `);
});

app.get("/cookie", (req, res) => {
  res.cookie("hello", "world", { maxAge: 86400 * 1000 });
  res.send("cookies... yummm");
});

app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head><title>Page Not Found</title></head>
      <body>
        <h1>Oops! This page could not be found</h1>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
