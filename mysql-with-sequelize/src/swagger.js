import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

// const currentDir = path.dirname(new URL(import.meta.url).pathname);
// console.log(currentDir)


const basePath = '/api/v1'; // Define your base path here

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'user-crud-express',
            version: '1.0.0',
            description: 'Simple User CRUD API with Express and MongoDB',
        },
        servers: [{ url: basePath }], // Define the base URL here
    },
    // Replace './routes/*.js' with 'src/routes/*.js' to match your actual route files location
    apis: ['src/routes/*.js'], // Path to the API routes
};


export const swaggerSpec = swaggerJSDoc(options);
