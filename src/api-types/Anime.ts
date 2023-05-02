export interface AbsoluteAnimeEpisodeAPIResponse {
    data: APIEpisodeResponse[]
    meta: {
        count: number
    }
    links: {
        first: string
        prev?: string
        next?: string
        last: string
    }
}

export interface AbsoluteAnimeAPIResponse {
    data: APIAnimeResponse[]
    meta: {
        count: number
    }
    links: {
        first: string
        prev?: string
        next?: string
        last: string
    }
}


enum Type {
    Anime = 'anime',
    Manga = 'manga'
}

type link = {
    self: string
}

type titles = {
    en: string
    en_jp: string
    ja_jp: string
}

type ratingFrequencies = {
    '2': string
    '3': string
    '4': string
    '5': string
    '6': string
    '7': string
    '8': string
    '9': string
    '10': string
    '11': string
    '12': string
    '13': string
    '14': string
    '15': string
    '16': string
    '17': string
    '18': string
    '19': string
    '20': string
}

enum subtype {
    Ona = 'ONA',
    Ova = 'OVA',
    Tv = "TV",
    Movie = "movie",
    Music = "music",
    Special = "special"

}

enum ageRating {
    G = 'G',
    PG = 'PG',
    R = 'R',
    R18 = 'R18',
}

enum AnimeStatus {
    Current = 'current',
    Finished = 'finished',
    Tba = 'tba',
    Unreleased = 'unreleased',
    Upcoming = 'upcoming'
}

type dimension = {
    width: string
    height: string
}

type dimensions = {
    tiny: dimension
    small: dimension
    medium: dimension
    large: dimension
}

type Image = {
    tiny: string
    small: string
    medium: string
    large: string
    original: string
    meta: dimensions
}
export interface APIAnime {
    createdAt: string
    updatedAt: string
    slug: string
    synopsis: string
    description: string
    coverImageTopOffset: number
    titles: titles
    canonicalTitle: string
    abbreviatedTitles: string[]
    averageRating: string
    ratingFrequencies: ratingFrequencies
    userCount: number
    favoritesCount: number
    startDate: string
    endDate: string
    nextRelease: null
    popularityRank: number
    ratingRank: number
    ageRating: ageRating
    ageRatingGuide: string
    subtype: subtype
    status: AnimeStatus
    tba: string
    posterImage: Image
    coverImage: Image
    episodeCount: number
    episodeLength: number
    youtubeVideoId: string
    showType: subtype
    nsfw: boolean
}


type relationship = {
    links: {
        self: string
        related: string
    }
}

export interface APIAnimeResponse {
    id: string
    type: Type
    link: link
    attributes: APIAnime
    relationships: {
        genres: relationship
        categories: relationship
        castings: relationship
        installments: relationship
        mappings: relationship
        reviews: relationship
        mediaRelationships: relationship
        characters: relationship
        staff: relationship
        productions: relationship
        quotes: relationship
        episodes: relationship
        streamingLinks: relationship
        animeProductions: relationship
        animeCharacters: relationship
        animeStaff: relationship
    }
}

// Episodes types
type episodeTitles = {
    en_jp: string
}

export interface APIEpisodeResponse {
    id: string
    type: Type
    link: link
    attributes: APIEpisode
    relationships: {
        media: relationship
        videos: relationship
    }
}

export interface APIEpisode {
    createdAt: string
    updatedAt: string
    titles: episodeTitles
    canonicalTitle: string
    seasonNumber: number
    number: number
    relativeNumber: number
    synopsis: string
    airdate: string
    length: string
    thumbnail: {
        original: string
    }
}