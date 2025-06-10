import { Request, Response, NextFunction } from "express";
import { cancelReservationService, createReservation, reservationByIdService, reservationService } from "../services/reservationService";
import catchAsync from "../utils/catchAsync";
import { Reservation } from "../entities/Reservation";

const getReservation = catchAsync(async(req : Request, res : Response) => {
        const reservations = await reservationService();
        res.status(200).json(reservations);
});

const getReservationById = async(req : Request, res : Response) => {
        try{
        const id = parseInt(req.params.id); // 🔹 Obtiene el ID de la URL
        const reservation = await reservationByIdService(id); 
        res.status(200).json(reservation);
}       catch(error) 
        {res.status(404).json("No existe Reservacion");}
};

const reservationSchedule = catchAsync(async (req: Request, res: Response) => {
        try{
        const newReservation = await createReservation (req);
        res.status(201).json({ message: "Reservación Exitosa", reservation: newReservation });
}
        catch(error)
        {res.status(400).json("Error al crear la reservación");} 
});
        

const reservationCancel = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const { id } = req.params;
        const reservationId = Number(id);
        const updatedReservation = await cancelReservationService(reservationId);

        if (typeof updatedReservation === "string") {
        const error = new Error(updatedReservation) as any;
        if (updatedReservation === "Reserva no encontrada") {
                error.statusCode = 404; // Reserva no encontrada
        } else {
                error.statusCode = 400; 
        }
        throw error; 
}
        res.status(201).json({message: "Reservación cancelada",reservation: updatedReservation,});
        } 
        catch (error) {
        if (error instanceof Error && error.hasOwnProperty('statusCode')) {
        const statusCode = (error as any).statusCode || 500;
                res.status(statusCode).json({message: error.message,});
        } 
        else {
                res.status(500).json({message: "Error en el servidor",error: error instanceof Error ? error.message : 'Error desconocido',});
        }
        }
};


export {getReservation, getReservationById, reservationSchedule, reservationCancel}