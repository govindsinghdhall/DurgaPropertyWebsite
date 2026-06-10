import { Link } from 'react-router-dom'

const footerLinks = {
  Discover: [
    { to: '/properties?category=buy', label: 'Buy Properties' },
    { to: '/properties?category=rent', label: 'Rent Properties' },
    { to: '/properties?category=commercial', label: 'Commercial' },
    { to: '/properties?category=new_projects', label: 'New Projects' },
    { to: '/properties?category=luxury', label: 'Luxury Homes' },
  ],
  Tools: [
    { to: '/tools', label: 'EMI Calculator' },
    { to: '/tools', label: 'ROI Calculator' },
    { to: '/tools', label: 'Rental Yield' },
    { to: '/tools', label: 'Affordability' },
    { to: '/compare', label: 'Compare Properties' },
  ],
  Company: [
    { to: '/contact', label: 'Contact Us' },
    { to: '/properties', label: 'Browse Properties' },
    { to: '/tools', label: 'Property Tools' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-brand-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-sm font-extrabold text-white">
                DP
              </div>
              <div>
                <p className="text-lg font-extrabold text-white">Durga Property</p>
                <p className="text-xs text-brand-300">Where dreams come home</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Gurgaon&apos;s trusted property company. Browse verified listings, use our
              financial tools, and connect with our team to find your dream home.
            </p>
            <div className="mt-4 flex gap-3 text-sm">
              <span>📞 +91 98100 78510</span>
              <span>✉️ ervindirsinghdhall@gmail.com</span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="font-bold text-white">{title}</p>
              <div className="mt-3 flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Durga Property. All rights reserved. RERA compliant platform.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
