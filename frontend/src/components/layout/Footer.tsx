import { Link } from 'react-router-dom';
import { ExternalLink, Atom } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#1e2a45] bg-[#050716]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30">
                <Atom size={20} className="text-purple-400" />
              </div>
              <span className="text-lg font-extrabold text-[#F5F7FF] tracking-tight">
                Astro<span className="text-purple-400">Hunt</span>{' '}
                <span className="text-[10px] font-mono text-purple-300 px-1.5 py-0.5 rounded bg-purple-500/15 border border-purple-500/25 ml-1">
                  DEEP SPACE AI
                </span>
              </span>
            </Link>
            <p className="text-sm text-[#9AA6C2] max-w-md leading-relaxed">
              A deep learning research platform designed to predict and classify
              celestial bodies into <strong>Stars</strong>, <strong>Exoplanets</strong>,{' '}
              <strong>Black Holes</strong>, and <strong>Asteroids</strong> using photometric
              cadence observations and relativistic astrophysics.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-[#F5F7FF] uppercase tracking-wider mb-4">
              Mission Control
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Home Page', path: '/' },
                { label: 'Mission Overview', path: '/dashboard' },
                { label: 'Celestial Classifier', path: '/dashboard/analysis' },
                { label: 'Model Benchmarks', path: '/dashboard/performance' },
                { label: 'Research Methodology', path: '/research' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-[#9AA6C2] hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Attribution & Space Archives */}
          <div>
            <h3 className="text-xs font-semibold text-[#F5F7FF] uppercase tracking-wider mb-4">
              Space Archives
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://archive.stsci.edu/missions-and-data/kepler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#9AA6C2] hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  NASA Kepler & TESS Archive <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.cosmos.esa.int/web/gaia/data-release-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#9AA6C2] hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  ESA Gaia DR3 Catalog <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://chandra.harvard.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#9AA6C2] hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  Chandra X-Ray Center (BHs) <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1e2a45] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9AA6C2]">
            © {new Date().getFullYear()} AstroHunt AI · Multiclass Celestial Machine Learning Project
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#9AA6C2] font-mono">
              TARGETS: STAR · EXOPLANET · BLACK HOLE · ASTEROID
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
