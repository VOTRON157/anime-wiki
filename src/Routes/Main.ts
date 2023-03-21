import express, { Request, Response, NextFunction } from 'express'
import APIManager from '../Structures/KitsuAPIManager'

const router = express.Router()
const Kitsu = new APIManager()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('home.ejs')
})



export default router