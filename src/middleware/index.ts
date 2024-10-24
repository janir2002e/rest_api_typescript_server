import { Response, Request, NextFunction } from "express"
import {validationResult } from 'express-validator'

export const handleInputErrors = (req : Request, res : Response, next : NextFunction) : Promise<void> => {

    //try {
        let errors = validationResult(req)
        // si los errores no estan vacios
        if(!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
            return;
        }

    // } catch (error) {
    //     console.log(error) 
    // }

    next()
}