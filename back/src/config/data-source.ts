import { DataSource } from "typeorm"  
import { DATABASEURL } from "./envs"
import { Reservation,  } from "../entities/Reservation"
import { User } from "../entities/User"
import { Credential } from "../entities/Credential"

export const AppDataSource = new DataSource({
    type: "postgres",
    url: DATABASEURL,
    synchronize: true,
    logging: false,
    dropSchema: false,
    entities: [User, Reservation, Credential],
    subscribers: [],
    migrations: [],
})


export const CredentialModule = AppDataSource.getRepository(Credential)