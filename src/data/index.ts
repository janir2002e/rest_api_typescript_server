import {exit} from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        // limpia la base de datos
        await db.sync({force: true})
        console.log('Datos eliminados correctamente')
        exit(0)
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

// busca el comando del package.json que tenga como segundo vector el --clear
// esto solo se cumple cuando ejecutamos npm run pretest
if(process.argv[2] === '--clear') {
    clearDB()
}
