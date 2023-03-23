const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function retrieveSession(id) {
    let object;

    await client.connect()
    const db = client.db(process.env.DB);
    const coll = db.collection('mySessions');
    const cursor = coll.find({ 'session.user.id': id });
    await cursor.forEach(
        testing => {
            object = testing
        }
    );

    setTimeout(() => {
        client.close();
    }, 1500)

    return object;
}

async function deleteSession(id) {
    try {
        await client.connect()
        const db = client.db(process.env.DB);
        const coll = db.collection('mySessions');
        const cursor = coll.deleteOne({ 'session.user.id': id  });
    }
    finally {
        setTimeout(() => {
            client.close();
        }, 1500)
    } 
}

deleteSession().catch(console.dir);

module.exports = { retrieveSession, deleteSession };