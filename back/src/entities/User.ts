import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Credential } from "./Credential";
import { Reservation } from "./Reservation";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: "date" })
    birthdate: Date;

    @Column("integer")
    nDni: number;

    @OneToOne(() => Credential, { cascade: true })
    @JoinColumn() 
    credentials: Credential;
    
    @OneToMany(() => Reservation, reservation => reservation.user, { cascade: true })
    reservations: Reservation[];
}