const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function retrieveSession(id) {
    try {
        await client.connect()
        const db = client.db(process.env.DB);
        const coll = db.collection('mySessions');
        const cursor = coll.find({ 'session.user.id': id });
        await cursor.forEach(console.log);
    }
    finally {
        setTimeout(() => {
            client.close();
        }, 1500)
    }
}
retrieveSession().catch(console.dir);

async function deleteSession(id) {
    try {
        await client.connect()
        const db = client.db(process.env.DB);
        const coll = db.collection('mySessions');
        const cursor = coll.deleteOne({ _id: '' });
        console.log(cursor);
    }
    finally {
        setTimeout(() => {
            client.close();
        }, 1500)
    } 
}

deleteSession().catch(console.dir);

module.exports = { retrieveSession, deleteSession };