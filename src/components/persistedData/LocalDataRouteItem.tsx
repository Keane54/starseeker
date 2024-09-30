import { CheapestRoute } from "@/app/actions";
import { Fragment } from "react";


export default function LocalDataRouteItem({
    index,
    route,
    to,
    from,
    totalCost,
}: CheapestRoute & { index: number }) {
    return (
        <div className="bg-blue-chill-50 rounded-md p-4">
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
                <h4 className="font-semibold text-xl">{from.name} to {to.name}</h4>
                {index === 0 && <span className="rounded-full text-sm bg-blue-chill-950 text-white px-4 py-1.5 whitespace-nowrap w-fit h-fit">Most Recent</span>}
            </div>

            <div className="my-4">
                <p className="text-lg font-bold">Jump Sequence</p>
                <ol className="flex flex-wrap text-sm">
                    {route.map((system, index) => {
                        return (
                            <Fragment key={index}>
                                {!!index && <span className="mx-2">→</span>}
                                <li>{system}</li>
                            </Fragment>
                        )
                    })}
                </ol>
            </div>


            <p className="font-semibold">Total Cost: {totalCost} GBP</p>
        </div>
    )
}