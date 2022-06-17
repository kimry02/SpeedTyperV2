import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.port || 5000;
MongoClient.connect(process.env.ATLAS_URI, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
})
.catch(err => {
    console.error(err.stack);
    process.exit(1);
})
.then(async client => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
});