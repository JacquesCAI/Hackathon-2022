const scoreController = require('../controller/score.controller')

module.exports = (app) => {
    app.route('/score/:serverId/:userId')
        .put(scoreController.addScore)
        .get(scoreController.getScore)
}
