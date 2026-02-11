// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Lead model
const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  source: { type: String, required: true },
  notes: String,
  status: { type: String, default: "New" },
});
const Lead = mongoose.model("Lead", LeadSchema);

// Routes
app.get("/api/leads", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

app.post("/api/leads", async (req, res) => {
  const newLead = new Lead(req.body);
  await newLead.save();
  res.status(201).json(newLead);
});

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/minicrm")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));