import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";


@Entity("credentials") // Nombre de la tabla en la base de datos
export class Credential {
    @PrimaryGeneratedColumn() // Genera un ID autoincremental
    id: number;

    @Column({ unique: true }) // El nombre de usuario debe ser único
    username: string;

    @Column() 
    password: string;
}