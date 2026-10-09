import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Flame,
  Orbit,
  CircleDot,
  Compass,
  Telescope,
  Layers,
  ChevronRight,
  Database,
  Atom,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { LightCurveChart } from '../components/charts/LightCurveChart';
import { CosmicBlackHoleCanvas } from '../components/astronomy/CosmicBlackHoleCanvas';
import {
  DATASET_STATS,
  CELESTIAL_PROFILES,
  DEMO_BLACKHOLE_CURVE,
  DEMO_EXOPLANET_CURVE,
  DEMO_STAR_CURVE,
  DEMO_ASTEROID_CURVE,
  ASTRO_DETECTION_STEPS,
} from '../data/demoData';

type CelestialTab = 'BLACK_HOLE' | 'EXOPLANET' | 'STAR' | 'ASTEROID';

export function HomePage() {
  const [activeTab, setActiveTab] = useState<CelestialTab>('BLACK_HOLE');

  const activeCurve =
    activeTab === 'BLACK_HOLE'
      ? DEMO_BLACKHOLE_CURVE
      : activeTab === 'EXOPLANET'
      ? DEMO_EXOPLANET_CURVE
      : activeTab === 'STAR'
      ? DEMO_STAR_CURVE
      : DEMO_ASTEROID_CURVE;

  const activeProfile = CELESTIAL_PROFILES.find((p) => p.id === activeTab) || CELESTIAL_PROFILES[2];

  return (
    <div className="min-h-screen bg-[#050714] text-[#F5F7FF] selection:bg-[#8B83FF]/30 selection:text-white">
      <Navbar />

      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        {/* Background cosmic atmospheric glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-700/[0.07] rounded-full blur-[140px]" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.05] rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[100px]" />

          {/* Starfield particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-white rounded-full animate-pulse"
              style={{
                left: `${(i * 19.3) % 100}%`,
                top: `${(i * 23.7) % 100}%`,
                opacity: 0.2 + (i % 5) * 0.15,
                animationDelay: `${(i % 7) * 0.7}s`,
                animationDuration: `${3 + (i % 4)}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Mission Description */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 mb-6">
                  <Atom size={14} className="text-purple-400 animate-spin-slow" />
                  <span className="text-xs font-semibold text-purple-300 tracking-wide uppercase">
                    Multiclass Celestial AI · Deep Space Observatory
                  </span>
                </div>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Identify{' '}
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                  Stars
                </span>
                ,{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  Exoplanets
                </span>
                ,<br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Black Holes
                </span>{' '}
                &{' '}
                <span className="bg-gradient-to-r from-orange-400 via-red-400 to-amber-500 bg-clip-text text-transparent">
                  Asteroids
                </span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg text-[#9AA6C2] max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Train and deploy state-of-the-art machine learning models to classify
                celestial bodies from Kepler, TESS, and Gaia photometric surveys. Distinguish
                between geometric planetary transits, relativistic gravitational microlensing,
                stellar granulation, and asteroid tumbling dynamics.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link to="/dashboard/analysis">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-purple-600/25">
                    Launch Celestial Classifier
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Explore Mission Control
                  </Button>
                </Link>
              </motion.div>

              {/* 4 Classification Tags */}
              <motion.div
                className="flex items-center justify-center lg:justify-start gap-2 mt-8 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-xs text-[#9AA6C2] mr-1">Target Classes:</span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  🌟 Star (Class 0)
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  🪐 Exoplanet (Class 1)
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  🕳️ Black Hole (Class 2)
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20">
                  ☄️ Asteroid (Class 3)
                </span>
              </motion.div>
            </div>

            {/* Right Column: Interactive Cosmic Black Hole & Accretion Disk Canvas */}
            <div className="lg:col-span-5">
              <motion.div
                className="relative mx-auto aspect-square max-w-[460px] rounded-3xl p-3 bg-gradient-to-b from-[#151a33] to-[#0a0d1e] border border-[#252d50] shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Visualizer header tabs */}
                <div className="flex items-center justify-between px-3 py-2 bg-[#080B18]/90 rounded-2xl border border-[#1e2a45] mb-2 z-10 relative">
                  <span className="text-xs font-mono font-medium text-[#9AA6C2] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    LIVE CELESTIAL SIMULATOR
                  </span>
                  <Badge variant="purple" size="sm">
                    Interactive 3D
                  </Badge>
                </div>

                {/* Canvas Body */}
                <div className="relative w-full h-[320px] rounded-2xl overflow-hidden bg-[#03040b]">
                  <CosmicBlackHoleCanvas activeObject={activeTab} />

                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#080B18]/85 backdrop-blur-md border border-[#1e2a45]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#9AA6C2] uppercase font-mono">Active Target</p>
                        <p className="text-sm font-bold text-[#F5F7FF]">{activeProfile.name}</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full font-mono font-bold bg-[#121A2E] border border-[#2a3352]">
                        {activeProfile.sampleObjects[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive Selector Pill */}
                <div className="grid grid-cols-4 gap-1.5 mt-2.5">
                  {(
                    [
                      { id: 'BLACK_HOLE', label: 'Black Hole', icon: CircleDot, color: 'text-purple-400' },
                      { id: 'EXOPLANET', label: 'Exoplanet', icon: Orbit, color: 'text-cyan-400' },
                      { id: 'STAR', label: 'Star', icon: Flame, color: 'text-amber-400' },
                      { id: 'ASTEROID', label: 'Asteroid', icon: Compass, color: 'text-orange-400' },
                    ] as const
                  ).map((t) => {
                    const Icon = t.icon;
                    const isSelected = activeTab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-medium transition-all flex flex-col items-center gap-1 ${
                          isSelected
                            ? 'bg-[#1b2342] text-white border border-[#8B83FF]/50 shadow-md'
                            : 'bg-[#0f1426] text-[#9AA6C2] hover:bg-[#151c36] hover:text-[#F5F7FF] border border-[#1e2a45]/50'
                        }`}
                      >
                        <Icon size={14} className={t.color} />
                        <span className="text-[10px] sm:text-xs truncate">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Live Light Curve Signature Preview ───────────────────────── */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-4 sm:p-6 overflow-hidden border border-[#232d52]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-400">
                    <Telescope size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#F5F7FF]">
                      Photometric Signature: {activeProfile.name}
                    </h3>
                    <p className="text-xs text-[#9AA6C2]">
                      {activeProfile.signatureFeature}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="purple" size="sm">
                    {activeProfile.tagline}
                  </Badge>
                  <Link to="/dashboard/analysis">
                    <Button size="sm">
                      Analyze This Profile
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>

              <LightCurveChart
                points={activeCurve}
                title={`${activeProfile.name} Light Curve — Photometric Cadence`}
                height={330}
                showRangeslider
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#1e2a45]">
                <div className="text-xs text-[#9AA6C2]">
                  <strong className="text-[#F5F7FF] block mb-0.5">Detection Mechanism:</strong>
                  {activeProfile.detectionMechanism}
                </div>
                <div className="text-xs text-[#9AA6C2]">
                  <strong className="text-[#F5F7FF] block mb-0.5">Astrophysical Origin:</strong>
                  {activeProfile.physicalPhenomenon}
                </div>
                <div className="text-xs text-[#9AA6C2]">
                  <strong className="text-[#F5F7FF] block mb-0.5">Key Catalog Objects:</strong>
                  {activeProfile.sampleObjects.join(' · ')}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── 4 Celestial Classes Deep Dive Grid ────────────────────────── */}
      <section className="py-16 bg-[#080B1A]/60 border-y border-[#151c36]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase mb-3">
              <Layers size={14} />
              Four-Class Astronomical Taxonomy
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              What Does The AI Distinguish?
            </h2>
            <p className="text-[#9AA6C2] max-w-2xl mx-auto mt-2 text-sm sm:text-base">
              Each celestial target imprints a distinct photometric, gravitational, or rotational
              fingerprint onto deep space telescope sensors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CELESTIAL_PROFILES.map((profile, i) => {
              const Icon =
                profile.id === 'BLACK_HOLE'
                  ? CircleDot
                  : profile.id === 'EXOPLANET'
                  ? Orbit
                  : profile.id === 'STAR'
                  ? Flame
                  : Compass;

              return (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full flex flex-col justify-between border border-[#1e2a45] hover:border-[#8B83FF]/40 transition-all group" hover>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="p-3 rounded-xl border border-white/10"
                          style={{ backgroundColor: `${profile.color}20`, color: profile.color }}
                        >
                          <Icon size={24} />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-[#9AA6C2] uppercase">
                          Class {i}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#F5F7FF] mb-1">
                        {profile.name}
                      </h3>
                      <p className="text-xs font-medium text-[#8B83FF] mb-3">
                        {profile.tagline}
                      </p>

                      <p className="text-xs text-[#9AA6C2] leading-relaxed mb-4">
                        {profile.physicalPhenomenon}
                      </p>

                      <div className="p-3 rounded-lg bg-[#0c1022] border border-[#1e2a45] space-y-1 mb-4">
                        <p className="text-[10px] font-semibold uppercase text-[#9AA6C2] tracking-wider">
                          Signature:
                        </p>
                        <p className="text-xs font-medium text-[#F5F7FF]">
                          {profile.signatureFeature}
                        </p>
                      </div>
                    </div>

                    <Link to="/dashboard/analysis">
                      <Button variant="ghost" size="sm" className="w-full text-xs justify-between group-hover:text-[#8B83FF]">
                        <span>Test {profile.name} Model</span>
                        <ChevronRight size={14} />
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Key Astronomical Dataset Statistics ───────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              {
                value: DATASET_STATS.totalSamples.toLocaleString(),
                label: 'Survey Observations',
                sub: 'Kepler, TESS & Gaia DR3',
                color: 'text-[#F5F7FF]',
              },
              {
                value: DATASET_STATS.featuresPerSample.toLocaleString(),
                label: 'Flux Measurements',
                sub: 'Cadence points per curve',
                color: 'text-cyan-400',
              },
              {
                value: `${DATASET_STATS.blackHoleCount} / ${DATASET_STATS.exoplanetCount}`,
                label: 'Black Holes & Planets',
                sub: 'Cataloged targets',
                color: 'text-purple-400',
              },
              {
                value: '98.4%',
                label: 'Multiclass Accuracy',
                sub: 'GalacticTransformer-X',
                color: 'text-amber-400',
              },
            ].map((stat, i) => (
              <Card key={i} className="p-6 text-center border border-[#1e2a45]" hover glow="purple">
                <p className={`text-2xl sm:text-3xl font-extrabold mb-1 ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-[#8B83FF]">{stat.label}</p>
                <p className="text-xs text-[#9AA6C2] mt-0.5">{stat.sub}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Scientific Discovery Pipeline ─────────────────────────────── */}
      <section className="py-16 bg-[#080B1A]/60 border-t border-[#151c36]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Astronomical AI Pipeline
            </h2>
            <p className="text-[#9AA6C2] max-w-xl mx-auto text-sm sm:text-base">
              End-to-end telemetry ingestion, relativistic feature extraction, and
              multi-class classification designed for research-grade verification.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ASTRO_DETECTION_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full relative border border-[#1e2a45]" hover glow="cyan">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-[#63E4E8]/15 flex items-center justify-center text-[#63E4E8] text-sm font-bold">
                      {step.step}
                    </div>
                    {i < ASTRO_DETECTION_STEPS.length - 1 && (
                      <ChevronRight
                        size={18}
                        className="text-[#2a3352] absolute right-4 top-8 hidden md:block"
                      />
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-[#F5F7FF] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#9AA6C2] leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ready to Classify CTA ─────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 sm:p-14 text-center relative overflow-hidden border border-[#2a3352]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-500/10 pointer-events-none" />
              <div className="relative">
                <div className="p-4 rounded-2xl bg-purple-500/15 text-purple-400 w-fit mx-auto mb-6 border border-purple-500/30">
                  <Database size={32} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
                  Ready to Probe the Cosmos?
                </h2>
                <p className="text-[#9AA6C2] max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
                  Upload any raw or normalized light curve CSV, or select one of our curated
                  deep space astronomical presets (Kepler-186f, Cygnus X-1, Alpha Centauri, Bennu).
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/dashboard/analysis">
                    <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-purple-600/25">
                      Start Multiclass Analysis
                      <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <Link to="/dashboard/performance">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      View Model Benchmark (4×4 Matrix)
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
