const {score} = require('../models/score.model');

exports.addScore = async (req, res, next) => {
    if (!req.query.name) {
        res.status(400).json({status: 'error', message: "Please add name params"})
    }
    if (!req.query.score) {
        res.status(400).json({status: 'error', message: "Please add score params"})
    }

    score.findOneAndUpdate({userName: req.query.name}, {score: req.query.score}, {new: true}, async (err, doc) => {
        if (err) {
            res.status(400).json({status: 'error', message: "Something wrong when"})
        }
        res.status(201).json({status: 'success', data: doc});
    })
};

exports.getScore = async (req, res, next) => {
    if (!req.query.name) {
        res.status(400).json({status: 'error', message: "Please add name params"})
    }

     score.findOne({userName: req.query.name}, function (err, user) {
        if (err) {
            res.status(400).json({status: 'error', message: "Something wrong when"})
        }
        res.status(201).json({status: 'success', data: user});
    })
}
