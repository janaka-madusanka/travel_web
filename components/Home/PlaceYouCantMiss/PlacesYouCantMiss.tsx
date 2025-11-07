import { placesToVisit } from "@/data/data";
import PlacesSelector from "./PlacesSelector";

export default function PlacesYouCantMiss() {
  return (
    <section className="w-full bg-white py-16">
      <PlacesSelector places={placesToVisit} />
    </section>
  );
}
