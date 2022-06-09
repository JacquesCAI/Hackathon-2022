const {default: mongoose} = require("mongoose");
const {Schema} = require("mongoose");
const {db} = require("../bin/bdd");

const scoreSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    score:{
        type: Number,
        default: 0
    },
    serverId: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: false
    },
    updated_at: {
        type: Date,
        required: false
    }
});

const score = db.model("score", scoreSchema);
module.exports = {score};
