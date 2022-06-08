const scoreController = require('../controller/score.controller')

module.exports = (app) => {
    app.route('/score/:userId')
        .post(scoreController.addScore)
        .get(scoreController.getScore)
}
