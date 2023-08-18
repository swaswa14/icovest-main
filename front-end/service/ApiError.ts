export class ApiError extends Error {
    status: string
    errorMessage: string

    exception: string
    timeStamp: Date

    statusCode: number

    constructor(
        status: string,
        errorMessage: string,
        exception: string,
        timeStamp: Date,
        statusCode: number
    ) {
        super(errorMessage)
        this.status = status
        this.errorMessage = errorMessage
        this.exception = exception
        this.timeStamp = timeStamp
        this.statusCode = statusCode
    }
}
