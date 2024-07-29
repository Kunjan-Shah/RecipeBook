const mongoose = require('mongoose');

try {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = mongoose.connection;
    connection.once('open', function () {
        console.log("MongoDB database connection established successfully");
    })
} catch(error) {
    console.log("Error connecting to MongoDB...")
    console.log(error)
}