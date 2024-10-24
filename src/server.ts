import express from "express"
import router from "./router"
import db from "./config/db"
import colors from 'colors'
import swaggerUi from "swagger-ui-express"; // Esta línea debería importar 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from 'morgan'
// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue('Conexión exitosa a la DB'))
    } catch (error) {
        console.log('error')
        console.log(colors.bold.red('Hubo un error al conectar a la BD'))
    }
}

connectDB()

// instacia de express
const server = express()

// Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL){
            // callback es la permite la conexion 
            // toma dos parametros si hay errores y el permiso a la conexion
            callback(null, true)
        } else {
            callback(new Error('Error de Cors'))
        }
        // console.log(origin)
    }
}
server.use(cors(corsOptions))

// leer datos de un formulario o respuestas que le llegan a una API
server.use(express.json())

// llama el enrutador
server.use(morgan('dev')) // muestra en consola la informacion si fue una peticion exitosa y cuanto se tardo
server.use('/api/products', router)

// server.get('/api', (req, res) => {
//     res.json({msg: 'Desde API'})
// })

// Docs // llama la configuracion de swagger
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))


export default server