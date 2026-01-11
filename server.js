const express = require("express");
const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Handle nested routes - catch all paths after /api/general/
app.get("/api/general/*", (req, res) => {
  let dbJson = require("./src/api/staticData/db.json");
  
  // Extract slug from the path directly
  let slug = req.path.replace("/api/general/", "");
  
  // Remove query strings if any
  slug = slug.split("?")[0];
  
  // Remove trailing slashes
  slug = slug.replace(/\/+$/, "");

  if (!slug) {
    return res.sendStatus(404);
  }
  
  if (dbJson.hasOwnProperty(slug)) {
    return res.send(dbJson[slug]);
  } else {
    return res.sendStatus(404);
  }
});

app.listen(8080, () => {
  console.log(`Example app listening on port 8080`);
});
