import Input from "@/components/forms/Input";
import { calculateJourney, JourneyCalculation } from "../actions";
import Form from "@/components/forms/Form";
import LocalDataDisplay from "@/components/persistedData/LocalDataDisplay";
import { ErrorResponse } from "@/types/types";

export default function JourneyPlannerPage() {
    return (
        <div className="w-full lg:w-3/5 mx-auto flex flex-col gap-8">
            <Form<JourneyCalculation | ErrorResponse> serverAction={calculateJourney} localDataKey="calculatedJourneys" submitLabel="Calculate">
                <Input type="number" name="distance" label="Distance (AU)" placeholder="Distance in AU"/>

                <Input type="number" name="passengers" label="Passengers (Max 5)" placeholder="Number of passengers" max={5}/>

                <Input type="number" name="parking" label="Parking (Days)" placeholder="Parking days"/>
            </Form>

            <LocalDataDisplay<JourneyCalculation> localDataKey="calculatedJourneys" heading="Travel Results"/>
        </div>
    )
}