const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

app.get("/test", (req, res) => res.send("Server online!"));

app.get("/u/:username", async (req, res) => {
  try {
    const response = await axios.get(
      `https://editor.p5js.org/editor/${req.params.username}/projects`
    );
    res.send(response.data);
  } catch (e) {
    res.status(404).send("Something went wrong.");
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
