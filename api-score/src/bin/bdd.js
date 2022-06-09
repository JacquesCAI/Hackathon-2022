const mongoose = require("mongoose");
let db = mongoose.connection

function connect() {
    if(process.env.NODE_ENV !== 'production') {
        const url = 'mongodb://'+process.env.MONGO_HOST+':'+process.env.MONGO_PORT+'/'+process.env.MONGO_DATABASE
        mongoose.connect(url,
            {useNewUrlParser: true, useUnifiedTopology: true})
        db.on('connected', () => console.log('Mongoose connected to db'))
        db.on('error', (err) => console.log(err.message))
    }else {
        mongoose.connect(process.env.MONO_URL_PRD,
            {useNewUrlParser: true, useUnifiedTopology: true})
        db.on('connected', () => console.log('Mongoose connected to db PRD'))
        db.on('error', (err) => console.log(err.message))
    }


}

function disconnect() {
    db.on('disconnected', () => console.log('Mongoose connection is disconnected.'))
}

module.exports = {connect, disconnect, db};
