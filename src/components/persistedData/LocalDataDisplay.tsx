'use client'

import Card from "../layout/Card"
import LocalDataJourneyItem from "./LocalDataJourneyItem"
import LocalDataRouteItem from "./LocalDataRouteItem"
import { isCheapestRouteCalculation, isJourneyCalculation } from "@/types/typeguards"
import { useEffect, useState } from "react"

interface LocalDataDisplayProps {
    localDataKey: string,
    heading?: string
}


export default function LocalDataDisplay<T>({ localDataKey, heading = 'Results' }: LocalDataDisplayProps) {
    const [data, setData] = useState<Array<T>>([])

    const retrieveData = () => {
        const localData = localStorage.getItem(localDataKey)

        if (localData) {
            setData(JSON.parse(localData))
        }
    }

    useEffect(() => {
        window.addEventListener('storage', retrieveData)

        return () => {
            window.removeEventListener('storage', retrieveData)
        }
    }, [])

    useEffect(() => retrieveData(), [])

    return (
        <Card className="overflow-hidden bg-white p-6">
            <h2 className="text-2xl font-bold mb-8">{heading}</h2>

            <div className="overflow-y-auto flex flex-col gap-6 max-h-96 border rounded-md p-4 border-gray-300">
                {data && data.length > 0 ? data.toReversed().map((item, index) => {
                    if (isJourneyCalculation(item)) {
                        return <LocalDataJourneyItem key={index} {...item} index={index} />
                    }

                    if (isCheapestRouteCalculation(item)) {
                        return <LocalDataRouteItem key={index} {...item} index={index} />
                    }
                }) : <p className="text-gray-500">Previous journey calculations will be shown here...</p>}
            </div>
        </Card>
    )
}