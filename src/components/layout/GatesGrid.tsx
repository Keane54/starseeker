'use client'

import Button from "./Button"
import Card from "./Card"
import Toast from "./Toast"
import { ErrorResponse, Gate, GetGateSuccess } from "@/types/types"
import { useState } from "react"
import { getGateInfo } from "@/app/actions"

interface GatesGridProps {
    gates: Gate[]
}

export default function GatesGrid({ gates }: GatesGridProps) {
    const [selectedGateInfo, setSelectedGateInfo] = useState<GetGateSuccess | ErrorResponse | null>(null)

    return (
        <>
            <ul className="grid grid-cols-12 gap-4 sm:gap-8 lg:gap-12">
                {gates.map(gate => {
                return (
                    <li key={gate.uuid} className="col-span-full sm:col-span-6 lg:col-span-4 2xl:col-span-3">
                        <Card className="h-full bg-white transition-shadow duration-300 hover:shadow-lg p-6">
                            <p className="text-2xl mb-2">{gate.name}</p>
                            <p className="text-gray-500 mb-12 text-sm">{gate.code}</p>
                            <Button onClick={async () => setSelectedGateInfo(await getGateInfo(gate.code))} label="More Data" className="w-full text-center"/>
                        </Card>
                    </li>
                )
                })}
            </ul>

            <Toast afterClose={() => setSelectedGateInfo(null)}>
                {selectedGateInfo?.type === 'success' && (
                    <div className="space-y-2">
                        <div className="mb-4">
                            <p className="text-2xl font-bold">{selectedGateInfo.name}</p>
                            <p className="text-lg text-gray-500">{selectedGateInfo.code}</p>
                        </div>


                        <p className="text-xl font-bold">Linked Star Systems:</p>

                        <div className="flex flex-wrap gap-2 p-4 border border-gray-300 rounded-md h-32 overflow-auto overscroll-contain">
                            {selectedGateInfo.links.toSorted((a, b) => parseInt(a.hu) - parseInt(b.hu)).map(link => {
                                const { code, hu } = link
                                return (
                                    <button onClick={async () => setSelectedGateInfo(await getGateInfo(code))} key={code} className="h-fit px-3 py-2 font-semibold text-sm border border-gray-300 rounded-md transition-all hover:bg-blue-chill-50">
                                        <p>{code} ({hu} HU)</p>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </Toast>
        </>
    )
}