import { Link } from "react-router-dom";
import { publishedCommercialMarketMaps } from "@/data/maps";

export function CommercialMarketsMapsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-100">
            Durga Property · Gurugram
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Gurugram Commercial Market Maps
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-blue-50 sm:text-lg">
            Explore commercial markets and shopping center maps across
            Gurugram with Durga Property.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {publishedCommercialMarketMaps.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedCommercialMarketMaps.map((map) => (
              <article
                key={map.slug}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Link
                  to={`/maps/${map.category}/${map.type}/${map.slug}`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={map.image}
                      alt={map.alt}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-5">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    <Link
                      to={`/maps/${map.category}/${map.type}/${map.slug}`}
                      className="hover:text-brand-600"
                    >
                      {map.name}
                    </Link>
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {map.description}
                  </p>

                  <Link
                    to={`/maps/${map.category}/${map.type}/${map.slug}`}
                    className="mt-5 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-700"
                  >
                    View Market Map →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Commercial Market Maps Coming Soon
            </h2>

            <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
              Commercial market maps will appear here as map images are
              added to the Gurugram Maps collection.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/maps/commercial"
            className="text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            ← Back to Commercial Maps
          </Link>

          <Link
            to="/maps"
            className="text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            All Gurugram Maps →
          </Link>
        </div>
      </main>
    </div>
  );
}
