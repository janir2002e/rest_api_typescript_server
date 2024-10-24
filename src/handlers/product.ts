import { Response, Request } from "express"
import Product from "../models/Product"
// import { check, validationResult } from 'express-validator'


export const getProduct = async (req : Request, res: Response) => {
     // try {
        const product = await Product.findAll({
            order: [
                ['id', 'DESC']
            ],
            // atributes: {exclude: ['price', 'availability']},
            // limit: 1
        }
        )
        res.json({data: product})
    // } catch (error) {
    //     console.log(error)
    // }
}

export const getProductById = async (req: Request, res: Response) => {
    //try {
        // obtener el parametro de la url
        const {id} = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({
                error: 'Producto no encontrado'
            })

            return
        }

        res.json({data: product})
    // } catch (error) {
    //     console.log(error)
    // }
}

export const createProduct = async (req : Request, res : Response) => {

    //"target": "ES2020", "module": "ESNext", "moduleResolution": "node",
    // colocar en el tsconfig para que soporte las clases

    //// Method one for insert data //////////////
    // const product = new Product(req.body)
    // const savedProduct = await product.save()
    // res.json({data: savedProduct}) 

    // Validacion en la funtion
    // await check('name')
    //     .notEmpty().withMessage('El nombre del Producto ni puede ir vacio')
    //     .run(req)
    // await check('price')
    //     .isNumeric().withMessage('Valor no válido')
    //     .notEmpty().withMessage('El precio no puede ir vacio')
    //     .custom(value => value > 0).withMessage('Precio no válido')
    //     .run(req)

    // obtiene los errores y valida que esten vacios, si estan vacios entra la condicción
    // let errors = validationResult(req)
    // if(!errors.isEmpty()) {
    //     return res.status(400).json({errors: errors.array()})
    // }

    /// Method two for insert data
    const product = await Product.create(req.body)
    res.status(201).json({data: product})
}

export const updateProduct = async  (req: Request, res: Response) => {
    //try {
        // obtener el parametro de la url
        const {id} = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({
                error: 'Producto no encontrado'
            })

            return
        }

        // Actualizar registros expecificos pero si no los barra por ser una peticion HTTP
        // product.name = req.body.name
        // product.price = req.body.price
        // product.availability = req.body.availability

        // proteger los registros con update
        await product.update(req.body)

        await product.save()

        res.json({data: product})
    // } catch (error) {
    //     console.log(error)
    // }
}

export const updateAvailability = async  (req: Request, res: Response) => {
    //try {
        // obtener el parametro de la url
        const {id} = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({
                error: 'Producto no encontrado'
            })

            return
        }

        // Actualizar un valor especifico negando el valor de la base de datos 
        // accedemos a los valores con dataVAlues.columna
        product.availability = !product.dataValues.availability 
        await product.save()

        res.json({data: product})
    // } catch (error) {
    //     console.log(error)
    // }
}

export const deleteProduct = async  (req: Request, res: Response) => {
    //try {
        // obtener el parametro de la url
        const {id} = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({
                error: 'Producto no encontrado'
            })

            return
        }

        await product.destroy()

        res.json({data: 'Producto Eliminado'})

    // } catch (error) {
    //     console.log(error)
    // }
}