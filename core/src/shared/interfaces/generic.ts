export interface ErrorResponse {
    status: number,
    code: number,
    message: string,
}

export type ErrorResponseStore = Record<string, ErrorResponse>
