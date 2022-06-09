const scoreController = require('../controller/score.controller')

module.exports = (app) => {
    app.route('/score/:userId')
        .put(scoreController.addScore)
        .get(scoreController.getScore)
    app.post('/score/:userId/register', scoreController.register);
    app.get('/ranking/:serverId', scoreController.ranking);
}
