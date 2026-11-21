import { Link } from "react-router-dom";
import { gurugramMaps } from "@/data/maps";

export function ResidentialSectorMapsPage() {
  const residentialMaps = gurugramMaps.filter(
    (map) => map.category === "residential" && map.type === "sectors"
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-100">
            Durga Property · Gurugram
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Gurugram Residential Sector Maps
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-blue-50 sm:text-lg">
            Explore residential sector locations across Gurugram with
            detailed maps from Durga Property.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {residentialMaps.map((map) => (
            <article
              key={map.slug}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={map.image}
                  alt={map.alt}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-extrabold text-slate-900">
                  {map.name}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {map.description}
                </p>

                <button
                  type="button"
                  className="mt-5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-700"
                  onClick={() => {
                    window.open(
                      map.image,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  View Full Map
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/maps/residential"
            className="text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            ← Back to Residential Maps
          </Link>
        </div>
      </main>
    </div>
  );
}
