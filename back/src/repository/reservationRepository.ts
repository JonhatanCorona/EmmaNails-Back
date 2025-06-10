import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Reservation } from "../entities/Reservation";


const reservationRepository: Repository<Reservation> = AppDataSource.getRepository(Reservation);

export default reservationRepository; 