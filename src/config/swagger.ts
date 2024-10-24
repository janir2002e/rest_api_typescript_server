import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
           {
            name: 'Products',
            description: 'API operations related to product' // operaciones relacionadas a productos
           }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript ',
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },// donde esta las rutas a las apis
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://codigoconjuan.com/wp-content/themes/cursosjuan/img/logo.svg');
            heigth: 130px;
            width: auto;
        }
    
        .swagger-ui .tobar {
            background-color: #2b3b45
        }
    `,
    customSiteTitle: 'Documentación REST API Express / TypeScript'
}
export default swaggerSpec

export {
    swaggerUiOptions
}