import express, { Request, Response, NextFunction } from 'express'
import AnimeController from '../Controllers/AnimeController'
const Controller = new AnimeController()

const router = express.Router()


router.get('/anime/:id', async (req: Request, res: Response, next) => (await Controller.get(req, res, next)))
router.get('/search', async (req: Request, res: Response, next) => (await Controller.search(req, res, next)))

export default router