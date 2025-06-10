
import { AppDataSource } from "../config/data-source";
import { Reservation } from "../entities/Reservation";
import { ReservationStatus, ReservationTime } from "../interfaces/enumReservation";
import { Request } from "express";
import reservationRepository from "../repository/reservationRepository";
import { User } from "../entities/User";


const reservations: Reservation[] = [];

const reservationService = async (): Promise<Reservation[]> => {
        const reservations = await reservationRepository.find()
        return reservations;
    };


const reservationByIdService = async (id: number): Promise<Reservation> => {
    try  {
    const userRepository = reservationRepository; 
    const reservation = await userRepository.findOneBy({ id }); 
    if (!reservation) throw new Error("Reservacion no encontrada"); 
    return reservation;
}
    catch(error)
    {
    throw new Error("Reservacion no encontrada"); 
    }
};

const createReservation = async (req: Request): Promise<Reservation> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    const { date, time, status, service, userId} = req.body;

    try {
        await queryRunner.startTransaction();

        const userRepo = queryRunner.manager.getRepository(User)

        const user = await userRepo.findOne({where :{id: userId}})

        if(!user) {
            throw new Error ("Usuario no existe")
        }

        const newReservation = new Reservation();
        newReservation.date = new Date(date + "T00:00:00");
        newReservation.time = time
        newReservation.status = status || ReservationStatus.Active;
        newReservation.service = service;
        newReservation.user = user as User

        await queryRunner.manager.save(newReservation);

        await queryRunner.commitTransaction();

        return newReservation;
    } 
    catch (error) {
        if (queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction();
        }
        throw new Error("Error al crear la reserva: ");
    } 
    finally {
        await queryRunner.release();
    }
};


const cancelReservationService = async (id: number): Promise<Reservation | string> => {
    const reservation = await reservationRepository.findOneBy({ id });

    if (!reservation) {
        return "Reserva no encontrada";
    }
    if (reservation.status === ReservationStatus.Cancelled) {
        return "La Reservación ya fue cancelada";
    }

    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);

    const reservationDate = new Date(reservation.date);
    reservationDate.setUTCHours(0, 0, 0, 0);

    if (reservationDate.getTime() === now.getTime() || reservationDate < now) {
        return "No se puede cancelar una reserva el mismo día";
    }

    reservation.status = ReservationStatus.Cancelled;
    return await reservationRepository.save(reservation);
};



export {
    cancelReservationService, createReservation, reservationByIdService, reservationService
}