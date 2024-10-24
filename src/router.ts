import { Router } from "express"
import { createProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from "./handlers/product"
import { body, param, validationResult } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *      schemas: 
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: interger
 *                      description: The Product Id
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 Pulgadas
 *                  price: 
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true                
*/

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: array
 *                                  items: 
 *                                      $ref: '#/components/schemas/Product'
*/

// Routing
router.get('/', getProduct)

/**
 * @swagger
 * /api/products/{id}:
 *   get: 
 *      summary: Get a product by ID
 *      tags: 
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *      responses: 
 *          200:
 *              description: Successful Response 
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/Product'
 * 
 *          404:
 *              description: No found
 *          400:
 *              description: Bad Request - Invalid ID
*/

router.get('/:id', 
    // validar el paramatre de id
    param('id')
        .isInt().withMessage('Id no Válido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags: 
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 pulgadas"
 *                          price:
 *                               type: number
 *                               example: 399
 *      responses: 
 *          201: 
 *              description: Success response
 *              content:
 *                  application/json:
 *                      $ref: '#/components/schemas/Product'  
 *          400: 
 *              description: Bad Request - invalid input data 
 *      
*/
router.post('/', 
    // comprobar el name y que cumpla con las reglas de validacion
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
       
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    // se llama la funcion 
    handleInputErrors,
    createProduct
)


/**
 * @swagger
 * /api/products/{id}:
 *   put: 
 *      summary: Updates a product with user input
 *      tags: 
 *          - Products
 *      description: Return the updated product 
 *      parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 pulgadas"
 *                          price:
 *                               type: number
 *                               example: 399
 *                          availability:
 *                               type: boolean
 *                               example: true
 *      responses: 
 *          200: 
 *              description: Success response
 *              content:
 *                  application/json:
 *                      $ref: '#/components/schemas/Product'  
 *          400:
 *              description: Bad Request -Invalid ID or Invalid input data
 *          404: 
 *              description: Product Not Found
*/
router.put('/:id', 
    param('id')
    .isInt().withMessage('Id no Válido'),
    // comprobar el name y que cumpla con las reglas de validacion
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
       
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor no válido'),
    // se llama la funcion 
    handleInputErrors,
    updateProduct)


/**
 * @swagger
 * /api/products/{id}:
 *   patch: 
 *      summary: Updates product availability
 *      tags: 
 *          - Products
 *      description: Return the updated availability
 *      parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *      responses: 
 *          200: 
 *              description: Success response
 *              content:
 *                  application/json:
 *                      $ref: '#/components/schemas/Product'  
 *          400:
 *              description: Bad Request - Invalid ID
 *          404: 
 *              description: Product Not Found
 * 
 */

router.patch('/:id', 
    param('id')
    .isInt().withMessage('Id no Válido'),
    handleInputErrors,
    updateAvailability)


/**
 * @swagger
 * /api/products/{id}:
 *   delete: 
 *      summary: Deletes a product by a given ID
 *      tags: 
 *          - Products
 *      description: Return a confirmation message
 *      parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *      responses: 
 *          200: 
 *              description: Success response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'product eliminated'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404: 
 *              description: Product Not Found
 * 
 */
router.delete('/:id',
    param('id')
    .isInt().withMessage('Id no Válido'),
    handleInputErrors,
    deleteProduct
)

export default router