const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const pollRoutes = require("./routes/poll.routes");
const authRoutes = require('./routes/auth.routes');

require('dotenv').config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL).then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("MongoDB connection error", err));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use("/api/polls", pollRoutes);
app.use('/api/auth', authRoutes);


app.get("/", (req, res) => {
    res.send("Hello from backend!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
