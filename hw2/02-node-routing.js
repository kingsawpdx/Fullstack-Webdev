const http = require("http");
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    "welcome",
    "redirect",
    "redirected",
    "cache",
    "cookie",
    "other",
  ];

  if (req.url === "/welcome") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>Welcome to the page! </h1>");
  } else if (req.url === "/redirect") {
    res.writeHead(302, { location: "/redirected" });
    res.end();
  } else if (req.url === "/redirected") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<p>You have been redirected!</p>");
    res.end();
  } else if (req.url === "/cache") {
    res.writeHead("Cache-Control", "max-age=86400");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("this resource was cached");
    res.end();
  } else if (req.url === "/cookie") {
    res.setHeader("Set-Cookie", "hello=world; Path=/; HttpOnly");
    res.write("<p>cookies... yummm</p>");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("Oops this page has not been found!");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
