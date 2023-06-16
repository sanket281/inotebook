const mongoose = require ("mongoose");

const mongoURI = 'mongodb+srv://sanket:sanko123@cluster0.lyvjxjs.mongodb.net/';

const connectToMongo = async () =>{    try{
        await mongoose.connect(mongoURI);
        console.log('connected to mongodb')
    }catch(err){
        console.log('error')
        console.error(err);
    }
}

module.exports = connectToMongo;