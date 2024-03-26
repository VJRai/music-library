export type ArtistCredit = 'PRIMARY' | 'FEATURED';

export type FormValue = {
    hours: number
    minutes: number
    seconds: number
    title: string
    releaseDate: Date
    releasedAs: 'single'|'album'
    genres:string[]
    albums: {
        albumName: string,
        trackNumber: number
    }[],
    artists: {
        name: string,
        credit: ArtistCredit
    }[]
}