import Form from "@/components/forms/Form";
import { CheapestRoute, getCheapestRoute } from "../actions";
import { starseekerClient } from "@/helpers/starseekerClient";
import LocalDataDisplay from "@/components/persistedData/LocalDataDisplay";
import { ErrorResponse } from "@/types/types";
import Select from "@/components/forms/Select";

export default async function RouteFinderPage() {
    const gates = await starseekerClient.getGatesList();

    if (gates.type === 'error') return <p className="text-center text-red-500">Error fetching gates, unable to find routes.</p>

    return (
        <div className="w-full lg:w-3/5 mx-auto flex flex-col gap-8">
            <Form<CheapestRoute | ErrorResponse> serverAction={getCheapestRoute} localDataKey="cheapestRoutes" submitLabel="Get Route">
                <label className="flex flex-col gap-4">
                    <p className="font-bold">From</p>

                    <Select name="fromGateCode">
                        {gates.type === 'success' && gates.data.map(gate => {
                            return (
                                <option key={gate.code} value={gate.code}>{gate.name}</option>
                            )
                        })}
                    </Select>
                </label>

                <label className="flex flex-col gap-4">
                    <p className="font-bold">To</p>
                    
                    <Select name="toGateCode">
                        {gates.type === 'success' && gates.data.map(gate => {
                            return (
                                <option key={gate.code} value={gate.code}>{gate.name}</option>
                            )
                        })}
                    </Select>
                </label>
            </Form>

            <LocalDataDisplay<CheapestRoute> localDataKey="cheapestRoutes" heading="Route Results"/>
        </div>
    )
}