
export type MetaData = {
    id: number,
    name: string
}

export type ArtistMetaData = MetaData & {
    credit: string
}

export type SongDTO = {
    id: string,
    title: string,
    duration: number,
    releaseDate: string,
    artists: ArtistMetaData[],
    albums: MetaData[],
    genres: MetaData[]
}

export type SongsDTO = {
    content: SongDTO[],
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: {
            unsorted: boolean,
            sorted: boolean,
            empty: boolean
        },
        offset: number,
        unpaged: boolean,
        paged: boolean
    },
    totalPages: number,
    totalElements: number,
    last: boolean,
    numberOfElements: number,
    first: boolean,
    number: number,
    size: number,
    sort: {
        unsorted: boolean,
        sorted: boolean,
        empty: boolean
    },
    empty: boolean
}