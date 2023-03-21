import express, { Request, Response, NextFunction } from 'express'
import APIManager from '../Structures/KitsuAPIManager'

const router = express.Router()
const Kitsu = new APIManager()

router.get('/:id', (req, res, next) => {
    if(!req.params.id) return res.redirect('/')
    Kitsu.searchOneAnime(req.params.id, 'id')
    .then(response => {
        if(!response) return res.status(404).send('Sem resultados.')
        res.render('animepageinfo', {
            anime: response
        })
    })
    .catch(e => {

    })
})
router.post('/search', (req: Request, res: Response, next: NextFunction) => {
    Kitsu.searchAnimes(req.body.animeName, 10)
        .then(response => {
            if(!response) return res.status(404).send('Sem resultados.')
            res.render('results', {
                animes: response
            })
        })
        .catch(e => {

        })
})

export default router