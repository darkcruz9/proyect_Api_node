const { MongoClient, ObjectId } = require('mongodb');
const { da } = require('zod/locales');

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

async function connect() {
    try {
        await client.connect();
        const database = client.db('admin');
        return database.collection('catalagoNutricional');
    } catch (error) {
        console.error('Error de conexion');
        console.error(error)
        await client.close();
    }
}

class catalagoNutricionalModel {


    static async read() {
        const db = await connect();
        const datos = await db.find({}).toArray();
        //DEBUG HERE: console.log(datos);
        return datos;
    }

    static async post({ input }) {
        const db = await connect();
        const datos = await db.insertOne({ ...input });
        //DEBUG HERE: console.log(datos);
        const documento = await db.findOne({ _id: datos.insertedId });
        //DEBUG HERE: console.log(documento);
        return documento;
    }

    static async find({ id }) {
        const db = await connect();
        const datos = await db.findOne({ _id: new ObjectId(id) });
        //DEBUG HERE: console.log(datos);
        return datos;
    }

}//End Class




module.exports = {
    catalagoNutricionalModel
}