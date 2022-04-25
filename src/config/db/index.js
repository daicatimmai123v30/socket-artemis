const mongoose = require('mongoose');

async function connection() {
    try {
        await mongoose.connect(process.env.DATABASE_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect successfully!');
    } catch (error) {
        console.log('connect failure!');
    }
}

module.exports = {
    connection
};