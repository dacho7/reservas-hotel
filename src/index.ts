import app from "./app";
import { sequelizeDB } from "./models";

sequelizeDB
  .sync({ force: true })
  .then(() => {
    app.listen(3000, () => {
      console.log(`Ejecutandose en el puerto 3000`);
      console.log(`Documentación en http://127.0.0.1:3000/docs`);
    });
  })
  .catch((e) => console.log(e, "Error en base de datos"));
