import app from "./app";

app.listen(app.get("port"), () => {
  console.log(`Ejecutandose en el puerto ${app.get("port")}`);
  console.log(`Documentación en http://127.0.0.1:${app.get("port")}/docs`);
});
