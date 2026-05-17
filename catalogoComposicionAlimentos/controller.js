const { catalagoNutricionalModel } = require('./catalogoNutrional.js');
const { validarSchemaCatalogo, validarSchemaCatalogoUpdate, validarIDParams } = require('./schema.js');



class catalogoNutricionalController {

    static async read(req, res) {
        try {
            //Metodo para leer todos los datos de la collection
            const datos = await catalagoNutricionalModel.read();
            if (datos.length === 0) {
                return res.status(400).send({ message: "No hay datos o no se lograron leer" });
            }
            //DEBUG HERE: console.log(datos) 
            //Retornamos los datos y codigo
            console.log("Coleccion encontrada");
            return res.status(201).send(datos);

        } catch (error) {
            console.error(error);
            console.log("Error de conexion");
            //Retornamos error de conexion
            return res.status(500).send({ message: "Internal Server Error" });
        }

    }

    static async create(req, res) {
        try {
            //Metodo para Insertar un documento
            //Validamos los tipos de datos
            const data = await validarSchemaCatalogo(req.body);
            //DEBUG HERE: console.log(data)            
            //Manejamos el Error si uno de los datos no son validos
            if (!data.success) {
                console.error(data.error);
                return res.status(400).send({ message: data.error })
            }

            //Creamos el documento a insertar a la coleccion
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
                        Valor: data.data.fibraDietTotal
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
                estadoRegistro: data.data.estadoRegistro
            }

            //Insertamos el documento a la coleccion
            const result = await catalagoNutricionalModel.post({ input });
            //Manejamos el error en caso que haya algun error en la insercion
            if (!result) {
                return res.status(400).send({ message: "Error al ingresar documento" })
            }
            //Mostramos el documento insertado satisfactioriamente
            console.log("Documento Creado");
            return res.status(200).send({
                message: "Alimento ingresado satisfactoriamente",
                documento: result
            });
        } catch (error) {
            console.error(error);
            console.log("Error de conexion");
            //Retornamos error de conexion
            return res.status(500).send({ message: "Internal Server Error" });
        }

    }

    static async getById(req, res) {
        try {
            //Metodo para localizar un documento por _id
            //Sanitizamos el ID obtenido de la URL
            const id = await validarIDParams(req.params.id);
            //Mostramos el mensaje si el ID no es valido
            if (!id.success) {
                console.error(id.error);
                //Decimos documento no encontra en vez de ID no valido por seguridad
                return res.status(400).send({ message: "ID no Valido" });
            }

            //Mandamos a buscar el documento en cuestion
            const documento = await catalagoNutricionalModel.find({ id: id.data });

            //Validamos si el documento existe
            if (!documento) {
                //console.error(documento.error);
                //Decimos documento no encontra en vez de ID no valido por seguridad
                return res.status(400).send({ message: "No se encontro ningun documento" });
            }
            //retornamos el documento encontrado y valido
            console.log("Documento Encontrado");
            return res.status(302).send({
                message: "Documento encontrado",
                documento: documento
            })
        } catch (error) {
            console.error(error);
            console.log("Error de conexion");
            //Retornamos error de conexion
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

    static async delete(req, res) {
        //Metodo para Eliminar un documento
        try {
            //Validamos que el mongoID
            const id = await validarIDParams(req.params.id);

            if (!id.success) {
                console.log(id.error);
                return res.status(400).send({ message: "No se encontro ningun documento " });
            }
            //Validamos que el documento a borrar exista en la coleccion
            const documento = await catalagoNutricionalModel.find({ id: id.data });
            //Sino existe le informamos al cliente
            if (!documento) {
                return res.status(400).send({ message: "No se encontro ningun documento " });
            } else {
                //Tendriamos que enviar a preguntar si estan seguro de borrar el documento
                //Advertir que los cambios no pueden ser cambiados
                const documentoEliminado = await catalagoNutricionalModel.delete({ id: id.data });
                if (documentoEliminado === 1) {
                    console.log("Documento Eliminado");
                    //Podria tratar de enviar un validor para enviarlos por la URL
                    return res.status(201).send({ message: "Documento Eliminado Satisfactoriamente" })
                } else {
                    //Encaso de que haya algun error mostramos este mensaje
                    return res.status(400).send({ message: "Documento no se Elimino,  Vuelve a intentarlo" });
                };
            }
        } catch (error) {
            console.error(error);
            console.log("Error de conexion");
            //Retornamos error de conexion
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

    static async update(req, res) {
        //Metodo para Actualizar
        //Sanitizamos la request
        const id = await validarIDParams(req.params.id);
        const input = await validarSchemaCatalogoUpdate(req.body);
        //validamos si el ID es valido y los datos a actualizar cumplen con el schema
        if (!id.success) {
            console.error(id.error);
            //Decimos documento no encontra en vez de ID no valido por seguridad
            return res.status(400).send({ message: "ID no valido" });
        }

        if (!input.success) {
            console.error(id.error);
            //Decimos documento no encontra en vez de ID no valido por seguridad
            return res.status(400).send({ message: "Datos no validos" });
        }
        //Cargamos el documento encontrado

        const documentoEncontrado = await catalagoNutricionalModel.find({ id: id.data });
        
        //Construimos el objeto para posicionar los datos que se van a actualizar y respetar el modelo
        const inputUpdate = {
            codigo: input.data.codigo ?? documentoEncontrado.codigo,
            nombreAlimento: input.data.nombreAlimento ?? documentoEncontrado.nombreAlimento,
            nombreAlternos: input.data.nombreAlternos ?? documentoEncontrado.nombreAlternos,
            timeCreation: input.data.timeCreation,
            createBy: input.data.createBy ?? documentoEncontrado.createBy,
            composicionAlimento: {
                Agua: {
                    unidadMedida: "%",
                    Valor: input.data.agua ?? documentoEncontrado.composicionAlimento.Agua.Valor
                },
                Energia: {
                    unidadMedida: "Kcal",
                    Valor: input.data.energia ?? documentoEncontrado.composicionAlimento.Energia.Valor
                },
                "Proteina g": {
                    unidadMedida: "gr",
                    Valor: input.data.proteina ?? documentoEncontrado.composicionAlimento["Proteina g"].Valor
                },
                "Grasas Total ": {
                    unidadMedida: "gr",
                    Valor: input.data.grasas ?? documentoEncontrado.composicionAlimento["Grasas Total "].Valor
                },
                CarboHidratos: {
                    unidadMedida: "gr",
                    Valor: input.data.carboHidratos ?? documentoEncontrado.composicionAlimento.CarboHidratos.Valor
                },
                fibraDietTotal: {
                    unidadMedida: "gr",
                    valor: input.data.fibraDietTotal ?? documentoEncontrado.composicionAlimento.fibraDietTotal.Valor
                },
                Ceniza: {
                    unidadMedida: "gr",
                    Valor: input.data.ceniza ?? documentoEncontrado.composicionAlimento.Ceniza.Valor
                },
                Calcio: {
                    unidadMedida: "mg",
                    Valor: input.data.calcio ?? documentoEncontrado.composicionAlimento.Calcio.Valor
                },
                Fosforo: {
                    unidadMedida: "mg",
                    Valor: input.data.fosforo ?? documentoEncontrado.composicionAlimento.Fosforo.Valor
                },
                Hierro: {
                    unidadMedida: "mg",
                    Valor: input.data.hierro ?? documentoEncontrado.composicionAlimento.Hierro.Valor
                },
                Tiamina: {
                    unidadMedida: "mg",
                    Valor: input.data.tiamina ?? documentoEncontrado.composicionAlimento.Tiamina.Valor
                },
                riboflavina: {
                    unidadMedida: "mg",
                    Valor: input.data.riboflavina ?? documentoEncontrado.composicionAlimento.riboflavina.Valor
                },
                Niacina: {
                    unidadMedida: "mg",
                    Valor: input.data.niacina ?? documentoEncontrado.composicionAlimento.Niacina.Valor
                },
                vitaminaC: {
                    unidadMedida: "mg",
                    Valor: input.data.vitaminaC ?? documentoEncontrado.composicionAlimento.vitaminaC.Valor
                },
                vitaminaARetinol: {
                    unidadMedida: "mcg",
                    Valor: input.data.vitaminaARetinol ?? documentoEncontrado.composicionAlimento.vitaminaARetinol.Valor
                },
                acGrasosMonInsaturados: {
                    unidadMedida: "g",
                    Valor: input.data.acGrasosMonSaturados ?? documentoEncontrado.composicionAlimento.acGrasosMonInsaturados.Valor
                },
                acGrasosPolInsaturados: {
                    unidadMedida: "g",
                    Valor: input.data.acGrasosPolSaturados ?? documentoEncontrado.composicionAlimento.acGrasosPolInsaturados.Valor
                },
                acGrasosSaturados: {
                    unidadMedida: "g",
                    Valor: input.data.acGrasosSaturados ?? documentoEncontrado.composicionAlimento.acGrasosSaturados.Valor
                },
                Colesterol: {
                    unidadMedida: "mg",
                    Valor: input.data.colesterol ?? documentoEncontrado.composicionAlimento.Colesterol.Valor
                },
                Potasio: {
                    unidadMedida: "mg",
                    Valor: input.data.potasio ?? documentoEncontrado.composicionAlimento.Potasio.Valor
                },
                Sodio: {
                    unidadMedida: "mg",
                    Valor: input.data.sodio ?? documentoEncontrado.composicionAlimento.Sodio.Valor
                },
                Zinc: {
                    unidadMedida: "mg",
                    Valor: input.data.zinc ?? documentoEncontrado.composicionAlimento.Zinc.Valor
                },
                magnesio: {
                    unidadMedida: "mg",
                    Valor: input.data.magnesio ?? documentoEncontrado.composicionAlimento.magnesio.Valor
                },
                vitaminaB6: {
                    unidadMedida: "mg",
                    Valor: input.data.vitaminaB6 ?? documentoEncontrado.composicionAlimento.vitaminaB6.Valor
                },
                vitaminaB12: {
                    unidadMedida: "mcg",
                    Valor: input.data.vitaminaB12 ?? documentoEncontrado.composicionAlimento.vitaminaB12.Valor
                },
                acidoFolico: {
                    unidadMedida: "mcg",
                    Valor: input.data.acidoFolico ?? documentoEncontrado.composicionAlimento.acidoFolico.Valor
                },
                folatoEquFD: {
                    unidadMedida: "mcg",
                    Valor: input.data.folatoEquFD ?? documentoEncontrado.composicionAlimento.folatoEquFD.Valor
                },
                fraccionComestible: {
                    unidadMedida: "%",
                    Valor: input.data.fraccionComestible ?? documentoEncontrado.composicionAlimento.fraccionComestible.Valor
                }
            },
            estadoRegistro: input.data.estadoRegistro ?? documentoEncontrado.estadoRegistro
        }

        //Enviamos el documento ha actualizar
        const documentoActualizado = await catalagoNutricionalModel.update({ id: id.data, input: inputUpdate });

        //Validamos si el documento se ha actualizado ya que deberia retorar un objeto diferente de null
        if (!documentoActualizado) {
            //Validmos si el el Documento existe para actualizarlo
            return res.status(400).send({ message: "No se encontro ningun documento" });
        }

        //DEBUG HERE: console.log(documentoActualizado);
        console.log("Documento Actualizado");
        return res.status(200).send({ message: "Documento Actualizado", documentoNuevo: documentoActualizado });
    }

}//End Class

module.exports = {
    catalogoNutricionalController
}