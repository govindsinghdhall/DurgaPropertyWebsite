import { Link } from "react-router-dom";

export function CommercialMapsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-100">
            Durga Property · Gurugram
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Commercial Maps
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-blue-50 sm:text-lg">
            Explore commercial sectors, markets, shops, booths, SCO plots and
            other commercial property locations across Gurugram.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Gurugram Commercial Maps
          </h2>

          <p className="mt-2 text-slate-600">
            Select a commercial map category to explore locations across
            Gurugram.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Commercial Sector Maps */}
          <Link
            to="/maps/commercial/sectors"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 text-3xl">🗺️</div>

            <h3 className="text-lg font-extrabold text-slate-900">
              Commercial Sector Maps
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Explore commercial sectors and major business locations across
              Gurugram.
            </p>

            <span className="mt-4 inline-block text-sm font-bold text-brand-600">
              View Sector Maps →
            </span>
          </Link>

          {/* Market Maps */}
          <Link
            to="/maps/commercial/markets"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 text-3xl">🏬</div>

            <h3 className="text-lg font-extrabold text-slate-900">
              Market Maps
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Explore HUDA markets, local markets and commercial shopping
              locations.
            </p>

            <span className="mt-4 inline-block text-sm font-bold text-brand-600">
              View Market Maps →
            </span>
          </Link>

          {/* Booth Maps */}
          <Link
            to="/maps/commercial/booths"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 text-3xl">🏪</div>

            <h3 className="text-lg font-extrabold text-slate-900">
              Booth & Shop Maps
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Explore locations of commercial booths, shops and other retail
              properties.
            </p>

            <span className="mt-4 inline-block text-sm font-bold text-brand-600">
              View Booth & Shop Maps →
            </span>
          </Link>

          {/* SCO Maps */}
          <Link
            to="/maps/commercial/sco"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 text-3xl">🏢</div>

            <h3 className="text-lg font-extrabold text-slate-900">
              SCO Maps
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Explore SCO and commercial plot locations across Gurugram.
            </p>

            <span className="mt-4 inline-block text-sm font-bold text-brand-600">
              View SCO Maps →
            </span>
          </Link>
        </div>

        {/* Coming Soon */}
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h3 className="text-lg font-extrabold text-slate-900">
            More Commercial Maps Coming Soon
          </h3>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Individual Gurugram commercial map pages will be added as the map
            collection grows.
          </p>
        </div>

        {/* Back */}
        <div className="mt-8">
          <Link
            to="/maps"
            className="text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            ← Back to Gurugram Maps
          </Link>
        </div>
      </section>
    </div>
  );
}