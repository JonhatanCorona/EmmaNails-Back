import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!res.headersSent) {
        res.status(500).json({ message: err.message });
    }
};

export default errorHandler;