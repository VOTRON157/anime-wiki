import axios from "axios"

export default axios.create({
    baseURL: 'https://kitsu.io/api/edge/',
    headers: {
        'User-Agent': `VOTRON157/anime-wiki@1.0 Node.JS@${process.versions.node}`,
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
    },
})