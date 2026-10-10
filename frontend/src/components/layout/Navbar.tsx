import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Atom } from 'lucide-react';
import { Button } from '../ui/Button';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Mission Control', path: '/dashboard' },
  { label: 'Classifier Lab', path: '/dashboard/analysis' },
  { label: 'Model Benchmarks', path: '/dashboard/performance' },
  { label: 'Methodology', path: '/research' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2a45]/60 bg-[#050716]/85 backdrop-blur-xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            aria-label="AstroHunt Home"
          >
            <div className="p-1.5 rounded-xl bg-purple-500/15 group-hover:bg-purple-500/25 transition-colors border border-purple-500/30">
              <Atom size={22} className="text-purple-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-[#F5F7FF] tracking-tight leading-none">
                Astro<span className="text-purple-400">Hunt</span>{' '}
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-300 ml-1 border border-purple-500/25">
                  DEEP SPACE AI
                </span>
              </span>
              <span className="text-[9px] text-[#9AA6C2] font-mono tracking-wider">
                STAR · EXOPLANET · BLACK HOLE · ASTEROID
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors
                  ${
                    location.pathname === link.path
                      ? 'text-purple-300 bg-purple-500/15 border border-purple-500/30'
                      : 'text-[#9AA6C2] hover:text-[#F5F7FF] hover:bg-[#121A2E]'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/dashboard/analysis">
              <Button size="sm" className="shadow-md shadow-purple-600/25">
                <Sparkles size={14} />
                Classify Target
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[#9AA6C2] hover:text-[#F5F7FF] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[#1e2a45] bg-[#050716]/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${
                    location.pathname === link.path
                      ? 'text-purple-300 bg-purple-500/15'
                      : 'text-[#9AA6C2] hover:text-[#F5F7FF] hover:bg-[#121A2E]'
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link to="/dashboard/analysis" onClick={() => setIsOpen(false)}>
                <Button size="sm" className="w-full">
                  <Sparkles size={14} />
                  Classify Target
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
