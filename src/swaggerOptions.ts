export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Reservas API",
      version: "1.0.0",
      description: "Api para reservar hospedaje",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/router.ts"],
};
