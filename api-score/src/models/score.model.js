const {default: mongoose} = require("mongoose");
const {Schema} = require("mongoose");
const {db} = require("../bin/bdd");

const ItemSchema = new Schema({
    key: String,
    qte: Number
})

const scoreSchema = new Schema({
    userId: {
      type: String,
      required: true
    },
    score:{
        type: Number,
        default: 0
    },
    serverId: {
        type: String,
        required: true
    },
    items: [ItemSchema]
});

const Score = db.model("score", scoreSchema);
module.exports = {Score};
