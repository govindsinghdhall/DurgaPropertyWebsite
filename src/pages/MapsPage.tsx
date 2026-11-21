import { Link } from "react-router-dom";

export function MapsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-100">
              Gurugram Property Maps
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Gurugram Maps
            </h1>

            <p className="mt-5 text-base leading-7 text-blue-50 sm:text-lg">
              Explore residential and commercial property locations across
              Gurugram with Durga Property.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            to="/maps/residential"
            className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-2xl">
              🏠
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-brand-600">
              Residential Maps
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Explore residential sectors, colonies, plots, floors, houses,
              apartments and other residential property locations across
              Gurugram.
            </p>

            <span className="mt-6 inline-flex text-sm font-bold text-brand-600">
              Explore Residential Maps →
            </span>
          </Link>

          <Link
            to="/maps/commercial"
            className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-2xl">
              🏢
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-brand-600">
              Commercial Maps
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Explore commercial sectors, markets, booths, shops, SCO plots
              and other commercial property locations across Gurugram.
            </p>

            <span className="mt-6 inline-flex text-sm font-bold text-brand-600">
              Explore Commercial Maps →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}