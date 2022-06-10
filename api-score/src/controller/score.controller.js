const {Score} = require('../models/score.model');

exports.addScore = async (req, res) => {
    const {score} = req.body;

    if (typeof(score) != "number")
        return res.sendStatus(400);

    const {userId, serverId} = req.params;

    const scoreObj = await Score.findOne({userId,serverId}).then(res =>
        res??Score.create({
                userId,
                serverId
            })
    );

    scoreObj.score = Math.min(Math.max(0, scoreObj.score+parseInt(score)), 1000);

    scoreObj.save();

    res.sendStatus(200);
};

exports.getScore = async (req, res) => {
    const {userId,serverId} = req.params;

    const scoreObj = await Score.findOne({userId,serverId}).then(res =>
            res??Score.create({
                userId,
                serverId
            })
    );

    res.status(200).json(scoreObj.score);
}