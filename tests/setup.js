const mongoose = require('mongoose');

// Connect to MongoDB before running any tests
beforeAll(async () => {
    // Only connect if not already connected
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URL_TEST || 'mongodb://127.0.0.1:27017/user-app-test');
    }
});

// Disconnect from MongoDB after all tests are completed
afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
});
