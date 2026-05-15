const z = require('zod');

const catalogoNutricionalSchema = z.object({
    codigo: z.int({//Validamos que el codigo sea de 5 caracteres
        invalid_type_error: "Codigo debe ser un entero",
        require_error: "Codigo debe ser 5 caracteres"
    }).positive().gte(10000).lte(99999),
    nombreAlimento: z.string({//Validamos que el string no este vacio
        invalid_type_error: "Campo no puede ir vacio",//tambien que no tengo espacios vacios
        require_error: "Ingresa al menos un nombre"
    }).nonempty().trim().min(1),
    nombreAlternos: z.array(z.string(), {
        invalid_type_error: "No puede ir vacio",
        require_error: "Ingresa al menos un nombre Alterno"
    }).nonempty(),
    timeCreation: z.coerce.date({
        invalid_type_error: "Se ha generado un error con la fecha",
        require_error: "La fecha es mandatory"
    }),
    createBy: z.string({
        invalid_type_error: "Campo no puede ir vacio",
        require_error: "Ingresa al menos un USER"
    }).nonempty().trim().min(1),
    agua: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    energia: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    proteina: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
       grasas: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    carboHidratos: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    fibraDietTotal: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    ceniza: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    calcio: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    fosforo: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    hierro: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    tiamina: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    riboflavina: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    niacina: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    vitaminaC: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    vitaminaARetinol: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    acGrasosMonSaturados: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    acGrasosPolSaturados: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    acGrasosSaturados: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    colesterol: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    potasio: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    sodio: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    zinc: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    magnesio: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    vitaminaB6: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    vitaminaB12: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    acidoFolico: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    folatoEquFD: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    fraccionComestible: z.float32({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).nonnegative().default(0.0).nonoptional(),
    estadoRegistro: z.int({
        invalid_type_error: "campo no puede ir vacio",
        require_error: "Ingresa numeros"
    }).positive().nonoptional()
    
})//Fin object

const idParamsSchema = z.string({
    invalid_type_error : "ID invalidado",
    require_error: "Ingresa in ID valido"
}).regex(/^[0-9a-fA-F]{24}$/, "ID invalido") //Fin IDParams

function validarSchemaCatalogo(object) {
    return catalogoNutricionalSchema.safeParseAsync(object);
}

function validarSchemaCatalogoUpdate(object) {
    return catalogoNutricionalSchema.partial().safeParseAsync(object);
}

function validarIDParams(string){
    return idParamsSchema.safeParseAsync(string);
}

module.exports = {
    validarSchemaCatalogo,
    validarSchemaCatalogoUpdate,
    validarIDParams
}

