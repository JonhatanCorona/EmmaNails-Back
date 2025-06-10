import { DataSource } from "typeorm"  
import { PORTDB, DATABASENAME, POSTGRESPASSWORD, POSTGRESUSERNAME, HOSTPOSTGRES } from "./envs"
import { Reservation,  } from "../entities/Reservation"
import { User } from "../entities/User"
import { Credential } from "../entities/Credential"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: HOSTPOSTGRES,
    port: Number (PORTDB),
    username: POSTGRESUSERNAME,
    password: POSTGRESPASSWORD,
    database: DATABASENAME,
    synchronize: true,
    logging: false,
    dropSchema: false,
    entities: [User, Reservation, Credential],
    subscribers: [],
    migrations: [],
})


export const CredentialModule = AppDataSource.getRepository(Credential)