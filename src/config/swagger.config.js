const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");
const path = require("path");
const __dirname = path.resolve();

// const options = {
//   swaggerDefinition: {
//     openapi: "3.0.0",
//     info: {
//       version: "1.0.0",
//       title: "Node Vote 시스템",
//       description: "문제 풀이를 위한 API",
//     },
//     host: "localhost:3033",
//     basePath: "/",
//   },

//   apis: [path.join(__dirname, "../routes/*.js")], //Swagger 파일 연동
// };

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mini Blog API",
      description:
        "API endpoints for a mini blog services documented on swagger",
      contact: {
        name: "Desmond Obisi",
        email: "info@miniblog.com",
        url: "https://github.com/DesmondSanctity/node-js-swagger",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3033/",
        description: "Local server",
      },
    ],
  },
  // looks for configuration in specified directories
  apis: [path.join(__dirname, "/src/routes/*.js")], //Swagger 파일 연동
  //   apis: ["./routes/*.js"],
};

const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };
