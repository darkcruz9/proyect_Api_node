const { MongoClient, ObjectId } = require('mongodb');

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
        const documentos = await db.find({}).toArray();
        //DEBUG HERE: console.log(datos);
        return documentos;
    }

    static async post({ input }) {
        const db = await connect();
        const documentoInsertado = await db.insertOne({ ...input });
        //DEBUG HERE: console.log(datos);
        //Mostramos el documento recien insertado
        const documento = await db.findOne({ _id: datos.insertedId });
        //DEBUG HERE: console.log(documento);
        return documento;
    }

    static async find({ id }) {
        const db = await connect();
        const documentoEncontrado = await db.findOne({ _id: new ObjectId(id) });
        //DEBUG HERE:console.log(documentoEncontrado);
        return documentoEncontrado;
    }

    static async delete({ id }) {
        //DEBUG HERE: console.log(id);
        const db = await connect();
        const { deletedCount } = await db.deleteOne({ _id: new ObjectId(id) })
        //DEBUG HERE: console.log(deletedCount);
        return deletedCount;
    }

    static async update({ id, input }) {
        //DEBUG HERE: console.log(id, input);
        const db = await connect();
        const updatedDocument = await db.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: input }, { returnDocument: "after" });
        //DEBUG HERE: console.log(updatedDocument);
        return updatedDocument;
    }

}//End Class




module.exports = {
    catalagoNutricionalModel
}