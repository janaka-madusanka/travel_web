import { placesToVisit } from "@/data/destination";
import PlacesSelector from "./PlacesSelector";

export default function PlacesYouCantMiss() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Places You Can't Miss
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the most iconic locations in the area. Click on a destination to view it on the map.
          </p>
        </div>

        <PlacesSelector places={placesToVisit} />
      </div>
    </section>
  );
}