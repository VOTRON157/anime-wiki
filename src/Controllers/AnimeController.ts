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
                    console.log(err)
                    res.send('Aconteceu um erro na requisição, <a href="/">Clique aqui</a> para voltar a página inicial')
                })
        } catch (e) {
            console.log(e)
            res.send('Aconteceu um erro no lado do servidor que impediu essa ação, <a href="/">Clique aqui</a> para voltar a página inicial')
        }
    }

    public async get(req: Request, res: Response, next: NextFunction, filter = 'id') {
        try {
            const id = req.params.id
            if (!id.length) return res.redirect('back')
            this.instance(`anime?filter[${filter}]=${id}`)
                .then(async response => {
                    if (response.statusText !== "OK") res.send('A requisição falhou com o status ' + response.status + ' <a href="/">Clique aqui</a> para voltar a página inicial')
                    else {
                        const anime = response.data.data[0] as APIAnimeResponse

                        fetch("https://gogoanime.consumet.stream/anime-details/" + anime.attributes.slug)
                            .then((response) => response.json())
                            .then((animelist) => {
                                res.render('animepageinfo', {
                                    anime: anime,
                                    episodes: parseInt(animelist.totalEpisodes)
                                })
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
    public async assistir(req: Request, res: Response, next: NextFunction) {
        const animeId = req.params.id
        let episode = parseInt(req.params.episode)

        this.instance(`anime?filter[id]=${animeId}`).then(response => {
            const anime = response.data.data[0] as APIAnimeResponse
            fetch(`https://gogoanime.consumet.stream/vidcdn/watch/${anime.attributes.slug}-episode-${episode}`)
                .then((response) => response.json())
                .then(async (animelist) => {
                    let temDublado = {}
                    const servers = [`https://hls.servertv001.com/animes/${anime.attributes.slug}-dublado/${episode < 10 ? '0' + episode : episode}.mp4`, `https://video.servertv001.com/animes/${anime.attributes.slug.at(0)}/${anime.attributes.slug}/${episode < 10 ? '0' + episode : episode}.mp4`, `https://hd.servertv001.com/animeshd/${anime.attributes.slug.at(0)}/${anime.attributes.slug}/${episode < 10 ? '0' + episode : episode}.mp4`, `https://hd3.servertv001.com/animeshd/${anime.attributes.slug.at(0)}/${anime.attributes.slug}/${episode < 10 ? '0' + episode : episode}.mp4`, `https://hd2.servertv001.com/animeshd/${anime.attributes.slug.at(0)}/${anime.attributes.slug}/${episode < 10 ? '0' + episode : episode}.mp4`]
                    for (var i in servers) {
                        const response = await fetch(servers[i])
                        if (response.ok) {
                            temDublado = {
                                bool: true,
                                url: servers[i]
                            }
                            break
                        }
                    }
                    res.render('assistir', {
                        temDublado: temDublado,
                        anime,
                        streamUrl: animelist.Referer,
                        episode,
                    })
                })
        })
    }
}