const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error");
    console.log(error);
  });

// Bug structure
const bugSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  severity: String,
  status: String
});

const Bug = mongoose.model("Bug", bugSchema);

// Home route
app.get("/", (req, res) => {
  res.send("BugTrack backend is running!");
});

// Get all bugs
app.get("/bugs", async (req, res) => {
  const bugs = await Bug.find();
  res.json(bugs);
});

// Create a new bug
app.post("/bugs", async (req, res) => {
  const newBug = new Bug({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    severity: req.body.severity,
    status: req.body.status
  });

  await newBug.save();

  res.json(newBug);
});

// Update bug status
app.put("/bugs/:id", async (req, res) => {
  const updatedBug = await Bug.findOneAndUpdate(
    { id: req.params.id },
    { status: req.body.status },
    { new: true }
  );

  res.json(updatedBug);
});


app.delete("/bugs/:id", async (req, res) => {
  await Bug.findOneAndDelete({
    id: req.params.id
  });

  res.json({
    message: "Bug deleted"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});