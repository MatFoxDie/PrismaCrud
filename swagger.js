const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json'; 
const endpointsFiles = ['./index.js']; 

const doc = {
  info: {
    title: 'API com Express e Prisma',
    description: 'API para gerenciar usuários, autores, posts e comentários',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
