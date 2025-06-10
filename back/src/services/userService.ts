import {  AppDataSource} from "../config/data-source";
import { User } from "../entities/User";
import { Repository } from "typeorm";
import { createCredentials } from "./credentials";
import IUserDto from "../dto/IUserdto";
import { Credential } from "../entities/Credential";
import userRepository from "../repository/userRepository";
import { Logindto } from "../dto/LoginDto";
import { UserResponseDto } from "../dto/UserResponseDto";

let users: User[] = [];


export const getUsers = async (): Promise<User[]> => {
    const repositoryUser: Repository<User> = userRepository;
    
    const users = await repositoryUser.find({
        relations: ["reservations"], // Asegúrate de que el nombre sea correcto
    });

    return users;
};


export const userByIdService = async (id: number): Promise<User> => {
    const repositoryUser = userRepository; 
    const user = await repositoryUser.findOne({
        where: { id },
        relations: ["reservations"], 
    });

    if (!user) {
        throw new Error(`Usuario con id ${id} no encontrado`); 
    }
    return user; 
};



export const createUser = async (userData: IUserDto): Promise<User | void> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
        if (!userData.password) {
            throw new Error("La contraseña es requerida");
        }

        const existingUser = await queryRunner.manager.findOne(User, {
            where: [{ email: userData.email }, { nDni: userData.nDni }],
        });

        if (existingUser) {
            throw new Error("El email o DNI ya están en uso");
        }

        const existingCredential = await queryRunner.manager.findOne(Credential, {
            where: { username: userData.username },
        });

        if (existingCredential) {
            throw new Error("El nombre de usuario ya está en uso");
        }
        await queryRunner.startTransaction();

        const credentialId = await createCredentials(userData.username, userData.password);
        if (!credentialId) {
            throw new Error("Error al crear las credenciales");
        }

        const credential = queryRunner.manager.create(Credential, {
            id: credentialId,
            username: userData.username,
            password: userData.password,
        });

        await queryRunner.manager.save(credential);

        const user = queryRunner.manager.create(User, {
            name: userData.name,
            email: userData.email,
            birthdate: userData.birthdate,
            nDni: userData.nDni,
            credentials : credential,
        });

        await queryRunner.manager.save(user);
        await queryRunner.commitTransaction();

        return user;
    } catch (error) {
        if (queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction();
        }
        throw new Error(`Hubo un error al crear el usuario: ${error}`);
    } finally {
        await queryRunner.release();
    }
};



export const loginUser = async (username: string, password: string): Promise<Logindto> => {

    const passwordAut = await userRepository.findOne({
        where: {
            credentials: {
                password: password,  // Asegúrate de que este es el campo correcto
            },
        },
        relations: ['credentials'],
    });
    if (!passwordAut) {
        throw new Error("Contraseña incorrecta");
    }

        const user = await userRepository.findOne({
            where: {
                credentials: {
                    username: username,  // Asegúrate de que este es el campo correcto
                },
            },
            relations: ['credentials'],
        });
        

        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        
        const userResponse: UserResponseDto = {
            id: user.id,
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            nDni: user.nDni,
        };

        return { login: true, user: userResponse };
};




