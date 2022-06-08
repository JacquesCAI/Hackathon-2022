const {score} = require('../models/score.model');

exports.addScore = async (req, res) => {
    const {score} = req.body;
    if (!score || parseInt(score).toString() !== score || score === "NaN")
        res.status(400).json({status: 'error', message: "Please add score params"})

    const scoreObj = await score.findById(req.params.userId);

    if (scoreObj === null)
        return res.sendStatus(404)

    scoreObj.score = Math.max(0, scoreObj.score+parseInt(score));

    scoreObj.save();

    res.sendStatus(201);
};

exports.getScore = async (req, res) => {
    const scoreObj = await score.findById(req.params.userId);

    if (scoreObj === null)
        return res.sendStatus(404)

    res.status(201).json({status: 'success', data: scoreObj});
}
