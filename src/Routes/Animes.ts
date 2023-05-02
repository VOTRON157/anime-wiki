import express, { Request, Response, NextFunction } from 'express'
import AnimeController from '../Controllers/AnimeController'
const Controller = new AnimeController()

const router = express.Router()


router.get('/anime/:id', async (req: Request, res: Response, next) => (await Controller.get(req, res, next)))
router.get('/search', async (req: Request, res: Response, next) => (await Controller.search(req, res, next)))
router.get('/anime/:id/assistir/:episode', async (req: Request, res: Response, next) => (await Controller.assistir(req, res, next)))
router.post('/anime/:id', async (req: Request, res: Response, next) => (await Controller.redirectToNextPage(req, res, next)))

export default router