import {Request, Response, NextFunction} from 'express'

export const testRoute = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Wouh')
        res.status(200).json({success: true})
    } catch(error) {
        console.log('oh no')
        console.error(error);
        next(error);
    }
}