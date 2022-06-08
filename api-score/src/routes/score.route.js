const express = require('express');
const scoreController = require('../controller/score.controller')

module.exports = (app) => {
    app.route('/score')
        .post(scoreController.addScore)
        .get(scoreController.getScore)
}
