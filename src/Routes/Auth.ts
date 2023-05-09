import express, { Request, Response, NextFunction } from 'express'


const router = express.Router()

router.get('/login', (req: Request, res: Response, next: NextFunction) => {
    res.render('login.ejs')
})



export default router