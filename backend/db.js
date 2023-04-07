const mongoose = require ("mongoose");

const mongoURI = 'mongodb://127.0.0.1:27017/inotebook';

const connectToMongo = async () =>{
    try{
        await mongoose.connect(mongoURI);
        console.log('connected to mongodb')
    }catch(err){
        console.log('error')
        console.error(err);
    }
}

module.exports = connectToMongo;