import server from "./server";
import { PORT} from "./config/envs";
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";


AppDataSource.initialize()
    .then(() => {
        console.log("Base de Datos Conectada");
        server.listen(PORT, () => {
            console.log("Servidor Activo en el puerto", PORT);
        });
    })
    .catch(error => {
        console.error("Error al conectar la Base de Datos:", error);
    });