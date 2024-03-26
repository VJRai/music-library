export type MetaData = {
    id: number,
    name: string
}

export type Song = {
    id: string,
    title: string,
    duration: number,
    releaseDate: string,
    artists: MetaData[],
    albums: MetaData[],
    genres: MetaData[]
}