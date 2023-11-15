const mongoose = require('mongoose')

const connectDatabase = () => {
    console.log("Wait connecting to database")

    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("MongoDB Atlas Connected"))
        .catch((error) => console.log(error))
}

module.exports = connectDatabase