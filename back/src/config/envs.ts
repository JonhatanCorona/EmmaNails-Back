import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT
export const HOSTPOSTGRES= process.env.HOSTPOSTGRES
export const PORTDB = process.env.PORTDB
export const POSTGRESPASSWORD = process.env.POSTGRESPASSWORD
export const POSTGRESUSERNAME = process.env.POSTGRESUSERNAME
export const DATABASENAME = process.env.DATABASENAME
