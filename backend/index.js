// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

// Poll Schema
const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{
    option: { type: String, required: true },
    votes: { type: Number, default: 0 }
  }]
});

const Poll = mongoose.model("Poll", pollSchema);

// API Endpoints

// Create Poll
app.post("/polls", async (req, res) => {
  try {
    const { question, options } = req.body;
    const newPoll = new Poll({ question, options });
    await newPoll.save();
    res.json(newPoll);
  } catch (error) {
    res.status(500).json({ message: "Error creating poll", error });
  }
});

// Get A"l Polls
app.get("/polls", async (req, res) => {
    try {
      const polls = await Poll.find();
      res.json(polls);
    } catch (error) {
      console.error('Error fetching polls:', error); // Log the error to the console
      res.status(500).json({ message: 'Error fetching polls', error });
    }
  });

app.post('/polls', async (req, res) => {
    try {
      const { question, options } = req.body;
      const poll = new Poll({ question, options });
      await poll.save();
      res.json(poll);
    } catch (error) {
      console.error("Error saving poll:", error);  // Log the error to the server
      res.status(500).json({ message: 'Error saving poll', error });
    }
  });

// Vote on a Poll
app.post("/polls/:id/vote", async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.id);

    if (!poll) return res.status(404).json({ message: "Poll not found" });

    poll.options[optionIndex].votes += 1;
    await poll.save();

    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: "Error voting on poll", error });
  }
});

// Get Poll Results
app.get("/polls/:id/results", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) return res.status(404).json({ message: "Poll not found" });

    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: "Error fetching poll results", error });
  }
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
