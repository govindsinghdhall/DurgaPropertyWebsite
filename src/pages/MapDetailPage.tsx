import { Link, useParams } from "react-router-dom";
import { gurugramMaps } from "@/data/maps";

export function MapDetailPage() {
  const { category, type, slug } = useParams();

  const map = gurugramMaps.find(
    (item) =>
      item.category === category &&
      item.type === type &&
      item.slug === slug
  );

  if (!map) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Map Not Found
          </h1>

          <p className="mt-3 text-slate-600">
            The requested Gurugram map could not be found.
          </p>

          <Link
            to="/maps"
            className="mt-6 inline-block font-bold text-brand-600 hover:text-brand-700"
          >
            ← Back to Gurugram Maps
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-100">
            Durga Property · Gurugram Maps
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {map.name}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-blue-50 sm:text-lg">
            {map.description}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-100">
            <img
              src={map.image}
              alt={map.alt}
              className="mx-auto block max-h-[80vh] w-full object-contain"
            />
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold text-slate-900">
              {map.name}
            </h2>

            <p className="mt-3 max-w-4xl leading-7 text-slate-600">
              {map.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={map.image}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-brand-600 px-5 py-3 text-sm font-bold text-white hover:bg-brand-700"
              >
                View Full Map
              </a>

              <Link
                to={`/maps/${category}/${type}`}
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                ← More Maps
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
