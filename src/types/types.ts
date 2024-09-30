export interface ErrorResponse {
    type: 'error'
    error: string,
}

export interface SuccessResponse {
    type: 'success'
}

export interface Gate {
    createdAt: string,
    uuid: string,
    updatedAt: string | null,
    name: string,
    code: string,
    links: [
        {
            hu: string,
            code: string
        }
    ]
}

export type GetGateResponse = Gate

export type GetGateSuccess = Gate & SuccessResponse

export type GetGatesListResponse = Array<Gate>

export interface GetGatesListSuccess extends SuccessResponse {
    data: GetGatesListResponse
}

export interface GetRouteResponse {
    from: Gate,
    to: Gate,
    route: string[],
    totalCost: string
}

export type GetRouteSuccess = GetRouteResponse & SuccessResponse

export interface GetTransportResponse {
    recommendedTransport: { name: string, ratePerAu: number, capacity: number },
    journeyCost: number,
    parkingFee: number,
    currency: string
}

export type GetTransportSuccess = GetTransportResponse & SuccessResponse