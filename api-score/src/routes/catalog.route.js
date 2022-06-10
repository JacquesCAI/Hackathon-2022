const catalogController = require('../controller/catalog.controller')

module.exports = (app) => {
    app.get("/catalog/:serverId/:userId", catalogController.getCatalog);
    app.put("/catalog/:serverId/:userId/:itemKey", catalogController.buyItem);
}
