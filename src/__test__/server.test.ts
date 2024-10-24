//import request from 'supertest'
import server, {connectDB} from '../server'
import db from '../config/db'

// describe('GET /api', () => {
//     it('should send back a json response', async () => {
//         const res = await request(server).get('/api') // espera la respuesta de la api
        
//         expect(res.status).toBe(200)
//         // esperar que el encabezado sea un contenido de tipo json
//         expect(res.headers['content-type']).toMatch(/json/)
//         expect(res.body.msg).toBe('Desde API')

//         // lo que no debe ser
//         expect(res.status).not.toBe(404)
//         expect(res.body.msg).not.toBe('desde api')
//     })
// })

jest.mock('../config/db')

describe('ConnectDB', () => {
    // debe manejar el error de conexión a la base de datos
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            // niega la condiccion del try catch
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD')) 
        // valida el error  
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB() // llamamos la funcion y empieza las pruebas de arriba 
        
        // le pasamos el error y esperamos que coincidan
        expect(consoleSpy).toHaveBeenCalledWith( //expera haber sido llamado con 
            expect.stringContaining('Hubo un error al conectar a la BD')
        )
    })
        
})