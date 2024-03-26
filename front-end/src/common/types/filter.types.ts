export const KEY = {
    ID: 'id',
    TITLE: "title",
    DURATION: "duration",
    RELEASE_DATE: "releaseDate",
    ATTRIBUTED_ARTIST: "artist",
    ATTRIBUTED_ALBUM: "album",
    GENRE: "genre",
} as const

export const OPERATION = {
    LT: "lt",
    LTE: "lte",
    GT: "gt",
    GTE: "gte",
    EQ: "eq"
} as const;

export type FilterKey = typeof KEY[keyof typeof KEY];
export type FilterOperation = typeof OPERATION[keyof typeof OPERATION]

export type FilterParam = {
    key: FilterKey,
    operation: FilterOperation
    value: string
}