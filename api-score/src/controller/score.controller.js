const {Score} = require('../models/score.model');

exports.addScore = async (req, res) => {
    const {score} = req.body;

    if (typeof(score) != "number")
        return res.sendStatus(400);

    const {userId} = req.params;

    const scoreObj = await Score.findOne({userId});

    if (scoreObj === null)
        return res.sendStatus(404);

    scoreObj.score = Math.min(Math.max(0, scoreObj.score+parseInt(score)), 1000);
    scoreObj.updatedAt = new Date();

    scoreObj.save();

    res.sendStatus(200);
};

exports.getScore = async (req, res) => {
    const {userId} = req.params;
    const scoreObj = await Score.findOne({userId});

    if (scoreObj === null)
        return res.sendStatus(404)

    res.status(200).json(scoreObj.score);
}

exports.register = async (req,res) => {
    const {userId} = req.params;

    const {serverId,userName} = req.body;

    if (!serverId || !userName)
        return res.sendStatus(400);

    const scoreObj = await Score.findOne({userId});

    if (scoreObj)
        return res.sendStatus(201);

    await Score.create({
        userId,
        serverId,
        userName
    });
    res.sendStatus(201);
}