import { CheapestRoute, JourneyCalculation } from "@/app/actions"

export const isJourneyCalculation = (data: unknown): data is JourneyCalculation => !!data && (data as JourneyCalculation).type === 'success' && typeof(data) === 'object' && 'recommendedTransport' in data && data.recommendedTransport !== undefined

export const isCheapestRouteCalculation = (data: unknown): data is CheapestRoute => !!data && (data as CheapestRoute).type === 'success' && typeof(data) === 'object' && 'route' in data && data.route !== undefined