import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { APIAnime, APIAnimeResponse } from '../api-types/Anime';

export default class AnimeController {

    private instance = axios.create({
        baseURL: 'https://kitsu.io/api/edge/',
        headers: {
            'User-Agent': `VOTRON157/anime-wiki@1.0 Node.JS@${process.versions.node}`,
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json'
        },
        transformResponse: [(data) => {
            return JSON.parse(data);
        }]
    })

    public async search(req: Request, res: Response, next: NextFunction, filter = 'text') {
        try {
            const query = req.query.query
            if (!query?.length) return res.redirect('back')
            this.instance(`anime?filter[${filter}]=${query}`)
                .then(response => {
                    if (response.statusText !== "OK") res.send('A requisição falhou com o status ' + response.status + ' <a href="/">Clique aqui</a> para voltar a página inicial')
                    else {
                        const animes = response.data.data as APIAnimeResponse[]
                        res.render('results', {
                            animes: animes
                        })
                    }
                })
                .catch(err => {
                    res.send('Aconteceu um erro na requisição, <a href="/">Clique aqui</a> para voltar a página inicial')
                })
        } catch (e) {
            res.send('Aconteceu um erro no lado do servidor que impediu essa ação, <a href="/">Clique aqui</a> para voltar a página inicial')
        }
    }

    public async get(req: Request, res: Response, next: NextFunction, filter = 'id') {
        try {
            const id = req.params.id
            if (!id.length) return res.redirect('back')
            this.instance(`anime?filter[${filter}]=${id}`)
                .then(response => {
                    if (response.statusText !== "OK") res.send('A requisição falhou com o status ' + response.status + ' <a href="/">Clique aqui</a> para voltar a página inicial')
                    else {
                        const anime = response.data.data as APIAnimeResponse[]
                        res.render('animepageinfo', {
                            anime: anime[0]
                        })
                    }
                })
                .catch(err => {
                    res.send('Aconteceu um erro na requisição, <a href="/">Clique aqui</a> para voltar a página inicial')
                })
        } catch (e) {
            res.send('Aconteceu um erro no lado do servidor que impediu essa ação, <a href="/">Clique aqui</a> para voltar a página inicial')
        }
    }
}