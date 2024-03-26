export const errorMessage = {
    required: `Field is required.`,
    minimumSongDuration: `Song must have a duration.`
}

export class RequestError extends Error {

    constructor(message: string, public statusCode: string){
        super(message)

    }
}