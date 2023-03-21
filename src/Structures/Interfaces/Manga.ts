export default interface KitsuApiReturn {
    id: number
    type: string
    links: {
        self: string
    }
    attributes: {
        createdAt: string
        synopsis: string
        episodeCount: number
        posterImage: {
            tiny: string
            large: string
            small: string
            medium: string
            original: string
        }
        coverImage: {
            tiny: string
            large: string
            small: string
            original: string
        }
        canonicalTitle: string
    }
}