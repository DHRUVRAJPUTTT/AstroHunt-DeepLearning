import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Telescope,
  History,
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Atom,
} from 'lucide-react';
import { DemoIndicator } from '../ui/DemoIndicator';

const SIDEBAR_ITEMS = [
  { label: 'Mission Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Celestial Classifier', path: '/dashboard/analysis', icon: Telescope },
  { label: 'Observation History', path: '/dashboard/history', icon: History },
  { label: 'Model Benchmarks', path: '/dashboard/performance', icon: BarChart3 },
  { label: 'Research Methodology', path: '/dashboard/research', icon: BookOpen },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-[#1e2a45]">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-purple-500/15 shrink-0 border border-purple-500/30">
            <Atom size={20} className="text-purple-400" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-[#F5F7FF] tracking-tight whitespace-nowrap">
                Astro<span className="text-purple-400">Hunt</span>
              </span>
              <span className="text-[9px] text-[#9AA6C2] font-mono tracking-wider">
                DEEP SPACE AI
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Dashboard navigation">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 group
                ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-sm'
                    : 'text-[#9AA6C2] hover:text-[#F5F7FF] hover:bg-[#121A2E]'
                }
              `}
              title={collapsed ? item.label : undefined}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#1e2a45] space-y-3">
        {!collapsed && <DemoIndicator />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center gap-2 text-xs text-[#9AA6C2] hover:text-[#F5F7FF] transition-colors w-full"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#050716]">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#121A2E] border border-[#1e2a45] text-[#9AA6C2] hover:text-[#F5F7FF]"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col border-r border-[#1e2a45] bg-[#070A1C]
          transition-all duration-300 shrink-0
          ${collapsed ? 'w-[68px]' : 'w-[250px]'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 bottom-0 z-50 flex flex-col
          border-r border-[#1e2a45] bg-[#070A1C] w-[250px]
          transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
