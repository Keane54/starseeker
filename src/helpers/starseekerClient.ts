import { 
    ErrorResponse, 
    GetGateResponse, 
    GetGatesListResponse, 
    GetGatesListSuccess, 
    GetGateSuccess, 
    GetRouteResponse, 
    GetRouteSuccess, 
    GetTransportResponse, 
    GetTransportSuccess 
} from "@/types/types"

interface CalculateJourneyCostArgs {
    distance: number
    passengers: number
    parking: number
}

class StarseekerClient {
    private readonly headers: HeadersInit = {}
    private readonly apiUrl: string

    constructor() {
        const requiredEnvVars = ['API_URL', 'API_KEY'];
        const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
        
        if (missingEnvVars.length > 0) {
          throw new Error(`The following environment variables are not set in \`.env\`: ${missingEnvVars.join(', ')}`);
        }

        // If a url contains a trailing slash it needs to be removed to avoid double slashes
        this.apiUrl = process.env.API_URL.endsWith('/') ? process.env.API_URL.slice(0, -1) : process.env.API_URL

        this.headers = {
            'x-api-key': process.env.API_KEY
        }
    }

    async getGatesList(): Promise<GetGatesListSuccess | ErrorResponse> {
        const response = await fetch(`${this.apiUrl}/gates`, {
            headers: this.headers
        })

        if (!response.ok) {
            const result = await response.json() as ErrorResponse

            if (result.error) return { type: 'error', error: result.error }
        }

        const result = await response.json() as GetGatesListResponse

        return {
            type: 'success',
            data: result
        }
    }

    async getGateByCode(gateCode: string): Promise<GetGateSuccess | ErrorResponse> {
        const response = await fetch(`${this.apiUrl}/gates/${gateCode}`, {
            headers: this.headers
        })

        if (!response.ok) {
            const result = await response.json() as ErrorResponse
            
            if (result.error) return { type: 'error', error: result.error }
        }

        const result = await response.json() as GetGateResponse

        return {
            type: 'success',
            ...result
        }
    }

    async getRoute(fromGateCode: string, toGateCode: string): Promise<GetRouteSuccess | ErrorResponse> {
        const response = await fetch(`${this.apiUrl}/gates/${fromGateCode}/to/${toGateCode}`, {
            headers: this.headers
        })

        if (!response.ok) {
            const result = await response.json() as ErrorResponse

            if (result.error) return { type: 'error', error: result.error }
        }

        const result = await response.json() as GetRouteResponse

        return {
            type: 'success',
            ...result
        }
    }

    async calculateJourneyCost({ distance, passengers, parking }: CalculateJourneyCostArgs): Promise<GetTransportSuccess | ErrorResponse> {
        const queryParams = new URLSearchParams(`passengers=${passengers}&parking=${parking}`)
    
        const response = await fetch(`${this.apiUrl}/transport/${distance}?${queryParams}`, {
            headers: this.headers
        })

        if (!response.ok) {
            const result = await response.json() as ErrorResponse

            if (result.error) return { type: 'error', error: result.error }
        }

        const result = await response.json() as GetTransportResponse

        return {
            type: 'success',
            ...result
        }
    }
}

export const starseekerClient = new StarseekerClient()