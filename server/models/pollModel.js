const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
});


const pollSchema = new mongoose.Schema({
    name: { type: String, required: true },
    options: [optionSchema],
    image: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    voters: [{ ip: String }],
}, { timestamps: true });

module.exports = mongoose.model("Poll", pollSchema);
