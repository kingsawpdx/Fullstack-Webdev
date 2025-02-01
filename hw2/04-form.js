const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send("Express Routing Exercise");
});

app.get("/form", (req, res) => {
  res.send(`
      <html>
        <head><title>User Form</title></head>
        <body>
          <form action="/submit" method="POST">
            <label for="name">Name: </label>
            <input type="text" id="name" name="name" required /><br>
            
            <label for="email">Email: </label>
            <input type="email" id="email" name="email" required /><br>
            
            <label for="comment">Comments: </label>
            <input type="comment" id="comment" name="comment" /><br>

            <p>Would you like to sign up for the newsletter?</p>
            <input type="radio" id="no" name="newsLetter" value="No, thank you." required>
            <label for="no">No, thank you.</label><br>

            <input type="radio" id="yes" name="newsLetter" value="Yes, sign me up for the newsletter.">
            <label for="yes">Yes, sign me up for the newsletter.</label><br><br>

            
            
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `);
});

app.post("/submit", (req, res) => {
  const { name, email, comment, newsLetter } = req.body;
  res.send(`
      <html>
        <head><title>User Form Results</title></head>
        <body>
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Comments: ${comment}</p>
          <p>Newsletter: ${newsLetter}</p>
        </body>
      </html>
    `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
