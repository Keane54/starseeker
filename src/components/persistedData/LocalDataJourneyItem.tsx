import { JourneyCalculation } from "@/app/actions";

export default function LocalDataJourneyItem({ 
    currency, 
    distance, 
    journeyCost, 
    parking, 
    parkingFee, 
    passengers, 
    recommendedTransport: { name, ratePerAu, capacity},
    index
}: JourneyCalculation & { index: number }) {
    return (
        <div className="bg-blue-chill-50 rounded-md p-4">
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
                <h4>A {distance} AU journey for {passengers} passengers with {parking} days of parking will cost a total of <span className="font-semibold">{journeyCost + parkingFee} {currency}</span></h4>
                {index === 0 && <span className="rounded-full text-sm bg-blue-chill-950 text-white px-4 py-1.5 whitespace-nowrap w-fit h-fit">Most Recent</span>}
            </div>

            <div className="my-4">
                <p>Recommended Transport - {name} (Capacity - {capacity})</p>
                <p>Rate Per AU - {ratePerAu} {currency}</p>
                <p>Daily Parking Fee - {parkingFee} {currency}</p>
            </div>

            <p className="font-semibold">Total Cost - {journeyCost + parkingFee} {currency}</p>
        </div>
    )
}