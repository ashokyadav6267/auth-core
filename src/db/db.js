const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGOOSE_URI)
    .then(()=>{
        console.log("MongoDb connected successfully")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDB;