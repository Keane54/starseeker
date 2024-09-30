import GatesGrid from "@/components/layout/GatesGrid";
import { starseekerClient } from "@/helpers/starseekerClient";

export default async function Home() {
  const gates = await starseekerClient.getGatesList();

  return (
      <div className="space-y-12">
        <h2 className="font-semibold text-2xl lg:text-4xl text-center">Star Systems</h2>
        {gates.type === 'success' ? <GatesGrid gates={gates.data}/> : <p className="text-center text-red-500">Error fetching gates</p>}
      </div>
  );
}