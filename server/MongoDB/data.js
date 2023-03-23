const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function retrieveSession() {
    try {
        await client.connect()
        const db = client.db(process.env.DB);
        const coll = db.collection('mySessions');
        const cursor = coll.find({ 'session.user.id': ''});
        await cursor.forEach(console.log);
    }
    finally {
        await client.close();
    }
}
retrieveSession().catch(console.dir);

module.exports = retrieveSession;