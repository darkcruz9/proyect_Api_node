const { catalagoNutricionalModel } = require('./catalogoNutrional.js');
const { validarSchemaCatalogo, validarSchemaCatalogoUpdate, validarIDParams } = require('./schema.js');



class catalogoNutricionalController {

    static async read(req, res) {
        try {
            console.log("usando controlador desde clase NUTRIONAL");
            const datos = await catalagoNutricionalModel.read();
            if (datos.length === 0) {
                return res.status(400).send({ message: "No se hay datos o no se lograron leer" });
            }
            //DEBUG HERE: console.log(datos) 
            return res.status(201).send(datos);

        } catch (error) {
            console.error(error);
            console.log("Error de conexion");
            return res.status(500).send({ message: "Internal Server Error" });
        }

    }

    static async create(req, res) {
        try {
            const data = await validarSchemaCatalogo(req.body);
            //Leemos si hay un error
            console.error(data.error ?? "No hubo errores");
            //Validamos los tipos de datos
            if (!data.success) {
                return res.status(400).send({ message: data.error })
            }

            //Creamos el objeto que vamos agregar a la coleccion
            const input = {
                codigo: data.data.codigo,
                nombreAlimento: data.data.nombreAlimento,
                nombreAlternos: data.data.nombreAlternos,
                timeCreation: data.data.timeCreation,
                createBy: data.data.createBy,
                composicionAlimento: {
                    Agua: {
                        unidadMedida: "%",
                        Valor: data.data.agua
                    },
                    Energia: {
                        unidadMedida: "Kcal",
                        Valor: data.data.energia
                    },
                    "Proteina g": {
                        unidadMedida: "gr",
                        Valor: data.data.proteina
                    },
                    "Grasas Total ": {
                        unidadMedida: "gr",
                        Valor: data.data.grasas
                    },
                    CarboHidratos: {
                        unidadMedida: "gr",
                        Valor: data.data.carboHidratos
                    },
                    fibraDietTotal: {
                        unidadMedida: "gr",
                        valor: data.data.fibraDietTotal
                    },
                    Ceniza: {
                        unidadMedida: "gr",
                        Valor: data.data.ceniza
                    },
                    Calcio: {
                        unidadMedida: "mg",
                        Valor: data.data.calcio
                    },
                    Fosforo: {
                        unidadMedida: "mg",
                        Valor: data.data.fosforo
                    },
                    Hierro: {
                        unidadMedida: "mg",
                        Valor: data.data.hierro
                    },
                    Tiamina: {
                        unidadMedida: "mg",
                        Valor: data.data.tiamina
                    },
                    riboflavina: {
                        unidadMedida: "mg",
                        Valor: data.data.riboflavina
                    },
                    Niacina: {
                        unidadMedida: "mg",
                        Valor: data.data.niacina
                    },
                    vitaminaC: {
                        unidadMedida: "mg",
                        Valor: data.data.vitaminaC
                    },
                    vitaminaARetinol: {
                        unidadMedida: "mcg",
                        Valor: data.data.vitaminaARetinol
                    },
                    acGrasosMonInsaturados: {
                        unidadMedida: "g",
                        Valor: data.data.acGrasosMonSaturados
                    },
                    acGrasosPolInsaturados: {
                        unidadMedida: "g",
                        Valor: data.data.acGrasosPolSaturados
                    },
                    acGrasosSaturados: {
                        unidadMedida: "g",
                        Valor: data.data.acGrasosSaturados
                    },
                    Colesterol: {
                        unidadMedida: "mg",
                        Valor: data.data.colesterol
                    },
                    Potasio: {
                        unidadMedida: "mg",
                        Valor: data.data.potasio
                    },
                    Sodio: {
                        unidadMedida: "mg",
                        Valor: data.data.sodio
                    },
                    Zinc: {
                        unidadMedida: "mg",
                        Valor: data.data.zinc
                    },
                    magnesio: {
                        unidadMedida: "mg",
                        Valor: data.data.magnesio
                    },
                    vitaminaB6: {
                        unidadMedida: "mg",
                        Valor: data.data.vitaminaB6
                    },
                    vitaminaB12: {
                        unidadMedida: "mcg",
                        Valor: data.data.vitaminaB12
                    },
                    acidoFolico: {
                        unidadMedida: "mcg",
                        Valor: data.data.acidoFolico
                    },
                    folatoEquFD: {
                        unidadMedida: "mcg",
                        Valor: data.data.folatoEquFD
                    },
                    fraccionComestible: {
                        unidadMedida: "%",
                        Valor: data.data.fraccionComestible
                    }
                },
                estadoRegistro: 1
            }

            //Insertamos el documento a la coleccion
            const result = await catalagoNutricionalModel.post({ input });

            if (!result) {
                return res.status(400).send({ message: "Error al ingresar documento" })
            }
            return res.status(200).send({
                message: "Alimento ingresado satisfactoriamente",
                documento: result
            });
        } catch (error) {
            console.error(error);
            console.log("Error de conexion");
            return res.status(500).send({ message: "Internal Server Error" });
        }

    }

    static async getById(req, res) {
        try {
            const id = await validarIDParams(req.params.id);

            if (!id.success) {
                console.log(id.error);
                return res.status(400).send({ message: "No se encontro ningun documento " });
            }

            const documento = await catalagoNutricionalModel.find({ id: id.data });

            return res.status(302).send({
                message: "Documento encontrado",
                documento: documento
            })
        } catch (error) {
            console.error(error);
            console.log("Error de conexion");
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

    static async delete(req, res) {
        try {
            console.log("Llamaste metodo DELETE isn't it");
            const id = await validarIDParams(req.params.id);

            if (!id.success) {
                console.log(id.error);
                return res.status(400).send({ message: "No se encontro ningun documento " });
            }

            const documento = await catalagoNutricionalModel.find({ id: id.data });

            return console.log("documento encontrado", documento);

            return res.status(302).send({
                message: "Documento encontrado",
                documento: documento
            })
        } catch (error) {
            console.error(error);
            console.log("Error de conexion");
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

}//End Class

module.exports = {
    catalogoNutricionalController
}