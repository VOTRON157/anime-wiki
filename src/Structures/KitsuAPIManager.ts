import KitsuMangaData from "./Interfaces/Manga";
import KitsuAnimeData from "./Interfaces/Anime";
import axios from 'axios'

enum Direction {
    name = 'text',
    id = 'id'
}

class APIManager {
    private baseURL = 'https://kitsu.io/api/edge/'
    
    public async searchAnimes(animeNameOrId: string, animesPerPage: number, pesquisarPelo?: string): Promise<KitsuAnimeData[]> {
        const res = await axios.get(`${this.baseURL}anime?filter[${pesquisarPelo || 'text'}]=${encodeURI(animeNameOrId)}&page[limit]=${animesPerPage}&page[offset]=0&fields[anime]=createdAt,synopsis,episodeCount,posterImage,coverImage,youtubeVideoId,canonicalTitle`, {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            }
        })
        return res.data.data
    }

    public async searchOneAnime(animeNameOrId: string, pesquisarPelo?: string): Promise<KitsuAnimeData> {
        const animes = await this.searchAnimes(animeNameOrId, 1, pesquisarPelo)
        if(!animes) return animes
        return animes[0]
    }

    public async searchMangas(mangaName: string, mangaPerPage: number): Promise<KitsuMangaData[]> {
        const res = await axios.get(`${this.baseURL}manga?filter[text]=${encodeURI(mangaName)}&page[limit]=${mangaPerPage}&page[offset]=0&fields[anime]=createdAt,synopsis,episodeCount,posterImage,coverImage,youtubeVideoId,canonicalTitle`, {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            }
        })
        return res.data.data
    }

    public async searchOneManga(mangaName: string): Promise<KitsuMangaData> {
        const mangas = await this.searchMangas(mangaName, 1)
        if(!mangas) return mangas
        return mangas[0]
    }
}

export default APIManager