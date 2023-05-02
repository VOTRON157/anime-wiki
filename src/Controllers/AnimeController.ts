import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { Anime } from '../Structures/AnimeFuncs';

export default class AnimeController {

    public async search(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query.query as string
            const animes = await Anime.getAnimesByName(`${query}`)
            res.render('results', { animes })
        } catch (erro) {
            res.send(`Ocorreu um erro no lado do servidor.`)
        }
    }

    public async get(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 0
            const id = req.params.id
            const anime = await Anime.getAnimeById(id)
            const episodes = await Anime.getAnimeEpisodes(anime.id, page)
            res.render('animepageinfo', { anime, episodes: episodes })
        } catch (e) {
            console.log(e)
            res.send('Aconteceu um erro no lado do servidor que impediu essa ação, <a href="/">Clique aqui</a> para voltar a página inicial')
        }
    }

    public async redirectToNextPage(req: Request, res: Response, next: NextFunction){
        try {
            let offset = parseInt(req.body.offset) || 0
            const id = req.params.id
            const episodes = await Anime.getEpisodeNextPage(id, offset)
            res.status(200).send(episodes)
        } catch (e) {

        }
    }

    public async assistir(req: Request, res: Response, next: NextFunction) {
        const animeId = req.params.id
        let episode = parseInt(req.params.episode)
        const anime = await Anime.getAnimeById(animeId)
        const servers = [`https://hd2.servertv001.com/animeshd/${anime.attributes.slug.at(0)}/${anime.attributes.slug}-dublado/${episode < 10 ? '0' + episode : episode}.mp4`, `https://video.serverotaku01.co/010/animes/${anime.attributes.slug.at(0)}/${anime.attributes.slug}-dublado/${episode < 10 ? '0' + episode : episode}.mp4`, `https://hls.servertv001.com/animes/${anime.attributes.slug}-dublado/${episode < 10 ? '0' + episode : episode}.mp4`, `https://video.servertv001.com/animes/${anime.attributes.slug.at(0)}/${anime.attributes.slug}-dublado/${episode < 10 ? '0' + episode : episode}.mp4`, `https://video.servertv001.com/animes/${anime.attributes.slug.at(0)}/${anime.attributes.slug}/${episode < 10 ? '0' + episode : episode}.mp4`, `https://hls.servertv001.com/animes/${anime.attributes.slug}/${episode}.mp4`, `https://hd.servertv001.com/animeshd/${anime.attributes.slug.at(0)}/${anime.attributes.slug}/${episode < 10 ? '0' + episode : episode}.mp4`, `https://hd3.servertv001.com/animeshd/${anime.attributes.slug.at(0)}/${anime.attributes.slug}/${episode < 10 ? '0' + episode : episode}.mp4`, `https://hd2.servertv001.com/animeshd/${anime.attributes.slug.at(0)}/${anime.attributes.slug}/${episode < 10 ? '0' + episode : episode}.mp4`, `https://lightspeedst.net/s1/mp4/${anime.attributes.slug}-dublado/sd/${episode}.mp4`, `https://lightspeedst.net/s2/mp4/${anime.attributes.slug}-dublado/sd/${episode}.mp4`, `https://lightspeedst.net/s3/mp4/${anime.attributes.slug}-dublado/sd/${episode}.mp4`, `https://lightspeedst.net/s4/mp4/${anime.attributes.slug}-dublado/sd/${episode}.mp4`, `https://lightspeedst.net/s5/mp4/${anime.attributes.slug}-dublado/sd/${episode}.mp4`]
        type translated = {
            bool: boolean,
            urls: Array<string>,
        }
        const transInfo: translated = {
            bool: false,
            urls: []
        }
        for (var i in servers) {
            const response = await fetch(servers[i])
            if (response.ok) {
                transInfo.urls.push(servers[i])
                transInfo.bool = true
            }
        }
        res.render('assistir', {
            translated: transInfo,
            anime,
            episode,
        })
    }
}