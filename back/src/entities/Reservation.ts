import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ReservationStatus, ReservationTime } from "../interfaces/enumReservation";
import { User } from "./User";

@Entity("reservations")
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date" })
    date: Date;

    @Column({ type: "enum", enum: ReservationTime })
    time: ReservationTime;

    @Column({ type: "enum", enum: ReservationStatus, default: ReservationStatus.Active })
    status: ReservationStatus;

    @Column({ type: "text" })
    service: string;

    @ManyToOne(() => User, (user) => user.reservations, { onDelete: "CASCADE" })
    @JoinColumn({name: "userId"})
    user: User;
}

