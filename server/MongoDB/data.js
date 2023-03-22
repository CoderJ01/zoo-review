const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect()
        const db = client.db(process.env.DB);
        const coll = db.collection('mySessions');
        const cursor = coll.find();
        await cursor.forEach(console.log);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);

module.exports = run;