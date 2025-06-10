import { Request, Response } from "express";
import { createUser, getUsers, loginUser, userByIdService } from "../services/userService";




const getUser = async(req : Request, res : Response) =>  {
try {
    const users = await getUsers();
    res.status(200).json(users);
} catch (error) {
    res.status(400).json({ message: "No se encontro al Usuario" });
}
}


const getUserById = async(req : Request, res : Response) => {
    try {
        const id = parseInt(req.params.id); // 🔹 Obtiene el ID de la URL
        const user = await userByIdService(id); 
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: "No se encontro al Usuario" });
    }
}

const registerUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body; 
        const user = await createUser(userData);
        res.status(201).json("Registrado Correctamente");  
    } catch (error) {
        res.status(400).json({ message: "Error al crear el usuario" });
    }
};


const userLogin = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const result = await loginUser(username, password);

        if (result.login) {
            res.status(200).json({
                login: "true",
                user: result.user,
            });
        } else {
            res.status(401).json({
                message: "Credenciales incorrectas", 
            });
        }
    } catch (error) {
        console.error("Error al intentar iniciar sesión:", error); 
        res.status(400).json({
            message: "Ocurrió un error al intentar iniciar sesión", 
        });
    }
};

export { getUser, getUserById, registerUser, userLogin };
