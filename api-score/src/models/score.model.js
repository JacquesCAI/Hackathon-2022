const {default: mongoose} = require("mongoose");
const {Schema} = require("mongoose");
const {db} = require("../bin/bdd");

const scoreSchema = new Schema({
    userId: {
      type: String,
      required: true
    },
    userName: {
        type: String,
        required: true,
    },
    score:{
        type: Number,
        default: 0
    },
    serverId: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: () => new Date()
    },
    updated_at: {
        type: Date,
        default: () => new Date()
    }
});

const Score = db.model("score", scoreSchema);
module.exports = {Score};
