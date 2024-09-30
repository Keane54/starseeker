'use server'

import { starseekerClient } from "@/helpers/starseekerClient"
import { ErrorResponse, GetGateSuccess, GetRouteSuccess, GetTransportSuccess } from "@/types/types"

export type JourneyCalculation = GetTransportSuccess & {
    distance: number,
    passengers: number,
    parking: number
}

export type CheapestRoute = GetRouteSuccess & {
    fromGateCode: string,
    toGateCode: string,
}

export const calculateJourney = async (prevState: any, formData: FormData): Promise<JourneyCalculation | ErrorResponse> => {
    const distance = parseInt(formData.get('distance')?.toString() ?? '')
    const passengers = parseInt(formData.get('passengers')?.toString() ?? '')
    const parking = parseInt(formData.get('parking')?.toString() ?? '')

    if (!distance || !passengers || !parking) return { type: 'error', error: 'All fields are required' }
    
    const result = await starseekerClient.calculateJourneyCost({ distance, passengers, parking })

    if (result.type === 'error') return { type: 'error', error: result.error }

    return {
        ...result,
        distance,
        passengers,
        parking
    }
}

export const getCheapestRoute = async (prevState: any, formData: FormData): Promise<CheapestRoute | ErrorResponse> => {
    const fromGateCode = formData.get('fromGateCode')?.toString() ?? ''
    const toGateCode = formData.get('toGateCode')?.toString() ?? ''

    if (!fromGateCode || !toGateCode) return { type: 'error', error: 'Both from and to gate codes are required' }

    const result = await starseekerClient.getRoute(fromGateCode, toGateCode)

    if (result.type === 'error') return { type: 'error', error: result.error }

    return {
        ...result,
        fromGateCode,
        toGateCode
    }
}

export const getGateInfo = async (gateCode: string): Promise<GetGateSuccess | ErrorResponse> => {
    const result = await starseekerClient.getGateByCode(gateCode)
    
    if (result.type === 'error') return { type: 'error', error: result.error }

    return {
        ...result
    }
}