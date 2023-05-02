import Fetcher from "./Fetcher"
import { APIAnimeResponse, AbsoluteAnimeAPIResponse, AbsoluteAnimeEpisodeAPIResponse, APIEpisodeResponse } from "../api-types/Anime"

export namespace Anime {
    export async function getAnimeById(id: string): Promise<APIAnimeResponse> {
        const response = await Fetcher(`anime?filter[id]=${id}`)
        return response.data.data[0] as APIAnimeResponse
    }

    export async function getAnimesByName(name: string, page = 0): Promise<APIAnimeResponse[]> {
        const response = await Fetcher(`anime?filter[text]=${name}?&page[limit]=20&page[offset]=${page}`)
        const data = response.data as AbsoluteAnimeAPIResponse
        const nextPage = data.links.next || 0
        const lastPage = data.links.last
        const prevPage = data.links.prev || 0
        const firstPage = data.links.first
        return data.data
    }

    export async function getAnimeEpisodes(id: string, page = 0): Promise<APIEpisodeResponse[]> {
        const anime = await getAnimeById(id);
        const episodes = await Fetcher(anime.relationships.episodes.links.related + `?page[limit]=20&page[offset]=${page}`)
        const data = episodes.data as AbsoluteAnimeEpisodeAPIResponse
        return data.data
    }
    export async function getEpisodeNextPage(id: string, atualPage: number): Promise<{
        episodes: APIEpisodeResponse[],
        page: number
    }> {
        const anime = await getAnimeById(id);
        const episodes = await Fetcher(anime.relationships.episodes.links.related + `?page[limit]=20&page[offset]=${atualPage}`)
        const data = episodes.data as AbsoluteAnimeEpisodeAPIResponse
        const nextPageLink = data.links.next
        const urlParams = new URLSearchParams(nextPageLink);
        const nextPage = parseInt(urlParams.get('page[offset]') || "0");
        const nextEpisodes = await getAnimeEpisodes(id, nextPage)
        return { 
            episodes: nextEpisodes,
            page: nextPage
        }
    }
    export async function getEpisodePrevPage(id: string, atualPage: number): Promise<{
        episodes: APIEpisodeResponse[],
        page: number
    }> {
        const anime = await getAnimeById(id);
        const episodes = await Fetcher(anime.relationships.episodes.links.related + `?page[limit]=20&page[offset]=${atualPage}`)
        const data = episodes.data as AbsoluteAnimeEpisodeAPIResponse
        const prevPageLink = data.links.prev
        const urlParams = new URLSearchParams(prevPageLink);
        const prevPage = parseInt(urlParams.get('page[offset]') || "0");
        const prevEpisodes = await getAnimeEpisodes(id, prevPage)
        return { 
            episodes: prevEpisodes,
            page: prevPage
        }
    }
}