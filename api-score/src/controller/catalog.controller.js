const {Score} = require('../models/score.model');

const catalog = {
    mode: {
        modes: ['rdc','vip'],
        items: {
            tshirt: {
                name: "T-shirt",
                price: 10
            },
            dress: {
                name: "Robe",
                price: 30
            },
            cape: {
                name: "Cape",
                price: 50
            }
        }
    },
    accessory: {
        modes: ['vip'],
        items: {
            glasses: {
                name: "Lunettes",
                price: 10
            },
            diploma_hat: {
                name: "Chapeau de diplômé",
                price: 15
            },
            cowboy_hat: {
                name: "Chapeau de cowboy",
                price: 30
            },
            bracelet: {
                name: "Bracelet",
                price: 5
            },
            christmas_hat: {
                name: "Chapeau de noël",
                price: 30
            },
        }
    },
    skin: {
        modes: ['vip'],
        items: {
            laser_saber: {
                name: "Sabre laser",
                price: 80
            },
            sword: {
                name: "Épée",
                price: 100
            }
        }
    }
}

const items_by_key = Object.entries(catalog).reduce((acc, [, {items}]) => ({
    ...acc,
    ...Object.entries(items).reduce((acc,[key,item]) => ({
        ...acc,
        [key]: item
    }), {})
}), {});


exports.getCatalog = async (req,res) => {
    const {mode} = req.query;

    if (!mode)
        return res.sendStatus(400);

    const {userId,serverId} = req.params;

    const scoreObj = await Score.findOne({
        serverId,
        userId
    }).then(res =>
            res??Score.create({
                userId,
                serverId
            })
    )

    res.json(
        Object.entries(catalog).reduce((acc,[category,{modes,items}]) => ({
            ...acc,
            [category]: modes.includes(mode) ?
                Object.entries(items).reduce((acc, [keyItem,item]) => {
                    const existingItem = scoreObj.items.find(({key}) => keyItem === key);
                    return {
                        ...acc,
                        [keyItem]: {
                            ...item,
                            qte: existingItem ? existingItem.qte : 0,
                            available: item.price <= scoreObj.score
                        }
                    }
                }, {}) :
                undefined
        }), {})
    );
}

exports.buyItem = async (req, res) => {
    const {itemKey} = req.params;
    const item = items_by_key[itemKey];
    if (!item)
        return res.sendStatus(404);

    const {userId,serverId} = req.params;

    const scoreObj = await Score.findOne({
        serverId,
        userId
    }).then(res =>
            res??Score.create({
                userId,
                serverId
            })
    )

    if (item.price > scoreObj.score)
        return res.sendStatus(403);

    const existingItem = scoreObj.items.find(({key}) => key === itemKey);
    if (existingItem)
        existingItem.qte += 1
    else
        scoreObj.items.push({
            key: itemKey,
            qte: 1
        })

    scoreObj.score -= item.price;

    await scoreObj.save();
    res.sendStatus(201);
}