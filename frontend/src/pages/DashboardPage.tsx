import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Rocket,
  CircleDot,
  Orbit,
  Flame,
  Compass,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { DemoIndicator } from '../components/ui/DemoIndicator';
import { LightCurveChart } from '../components/charts/LightCurveChart';
import { ClassDistributionChart } from '../components/charts/ClassDistributionChart';
import {
  DATASET_STATS,
  DEMO_BLACKHOLE_CURVE,
  DEMO_EXOPLANET_CURVE,
  DEMO_STAR_CURVE,
  DEMO_ASTEROID_CURVE,
  DEMO_ANALYSIS_HISTORY,
} from '../data/demoData';

export function DashboardPage() {
  const [selectedPreview, setSelectedPreview] = useState<'EXOPLANET' | 'BLACK_HOLE' | 'STAR' | 'ASTEROID'>('BLACK_HOLE');

  const currentCurve =
    selectedPreview === 'BLACK_HOLE'
      ? DEMO_BLACKHOLE_CURVE
      : selectedPreview === 'EXOPLANET'
      ? DEMO_EXOPLANET_CURVE
      : selectedPreview === 'STAR'
      ? DEMO_STAR_CURVE
      : DEMO_ASTEROID_CURVE;

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#F5F7FF] flex items-center gap-2">
            <Rocket size={24} className="text-[#8B83FF]" />
            Deep Space Mission Control
          </h1>
          <p className="text-sm text-[#9AA6C2] mt-1">
            Astronomical overview of 4-class celestial body detection: Stars, Exoplanets, Black Holes, and Asteroids.
          </p>
        </div>
        <DemoIndicator />
      </motion.div>

      {/* 4 Celestial Class Stat Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <StatCard
          label="Stars (Class 0)"
          value={DATASET_STATS.starCount.toLocaleString()}
          subtitle="Stable continuum baselines"
          icon={<Flame size={20} className="text-amber-400" />}
        />
        <StatCard
          label="Exoplanets (Class 1)"
          value={DATASET_STATS.exoplanetCount.toLocaleString()}
          subtitle="Keplerian transit dips"
          icon={<Orbit size={20} className="text-cyan-400" />}
        />
        <StatCard
          label="Black Holes (Class 2)"
          value={DATASET_STATS.blackHoleCount.toLocaleString()}
          subtitle="Microlens & accretion flares"
          icon={<CircleDot size={20} className="text-purple-400" />}
        />
        <StatCard
          label="Asteroids (Class 3)"
          value={DATASET_STATS.asteroidCount.toLocaleString()}
          subtitle="Rotational tumbling curves"
          icon={<Compass size={20} className="text-orange-400" />}
        />
      </motion.div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Light curve with interactive celestial switcher */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="p-4 border border-[#1e2a45]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 px-1">
              <div className="flex items-center gap-2">
                <Badge variant="purple" size="sm">
                  Telemetry Feed
                </Badge>
                <span className="text-xs text-[#9AA6C2]">
                  Select celestial signature to inspect
                </span>
              </div>

              {/* Selector buttons */}
              <div className="flex items-center gap-1 bg-[#101629] p-1 rounded-lg border border-[#1e2a45]">
                {(
                  [
                    { id: 'BLACK_HOLE', label: 'Black Hole', color: 'text-purple-400' },
                    { id: 'EXOPLANET', label: 'Exoplanet', color: 'text-cyan-400' },
                    { id: 'STAR', label: 'Star', color: 'text-amber-400' },
                    { id: 'ASTEROID', label: 'Asteroid', color: 'text-orange-400' },
                  ] as const
                ).map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedPreview(b.id)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                      selectedPreview === b.id
                        ? 'bg-[#1e2a45] text-white shadow-sm'
                        : 'text-[#9AA6C2] hover:text-[#F5F7FF]'
                    }`}
                  >
                    <span className={b.color}>● </span>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <LightCurveChart
              points={currentCurve}
              title={`${selectedPreview.replace('_', ' ')} — Deep Space Photometric Profile`}
              height={340}
              showRangeslider
            />
          </Card>
        </motion.div>

        {/* 4-Class Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="p-4 h-full border border-[#1e2a45]">
            <ClassDistributionChart
              starCount={DATASET_STATS.starCount}
              exoplanetCount={DATASET_STATS.exoplanetCount}
              blackHoleCount={DATASET_STATS.blackHoleCount}
              asteroidCount={DATASET_STATS.asteroidCount}
              height={340}
            />
          </Card>
        </motion.div>
      </div>

      {/* Recent analysis & System status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent analyses */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <Card className="overflow-hidden border border-[#1e2a45]">
            <div className="px-5 py-4 border-b border-[#1e2a45] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#F5F7FF]">
                Recent Observations & Classifications
              </h3>
              <Badge variant="demo" size="sm">
                4-Class Feed
              </Badge>
            </div>
            <div className="divide-y divide-[#1e2a45]/50">
              {DEMO_ANALYSIS_HISTORY.slice(0, 5).map((entry) => {
                const badgeVariant =
                  entry.celestialType === 'BLACK_HOLE'
                    ? 'purple'
                    : entry.celestialType === 'EXOPLANET'
                    ? 'success'
                    : entry.celestialType === 'STAR'
                    ? 'warning'
                    : 'info';

                const dotColor =
                  entry.celestialType === 'BLACK_HOLE'
                    ? 'bg-purple-400'
                    : entry.celestialType === 'EXOPLANET'
                    ? 'bg-cyan-400'
                    : entry.celestialType === 'STAR'
                    ? 'bg-amber-400'
                    : 'bg-orange-400';

                return (
                  <div
                    key={entry.id}
                    className="px-5 py-3 flex items-center justify-between hover:bg-[#151f38]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
                      <div>
                        <p className="text-sm text-[#F5F7FF] font-medium">
                          {entry.targetName || entry.fileName}
                        </p>
                        <p className="text-xs text-[#9AA6C2]">
                          {entry.fileName} · {new Date(entry.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium text-[#9AA6C2]">
                        {(entry.confidence * 100).toFixed(1)}%
                      </span>
                      <Badge variant={badgeVariant} size="sm">
                        {entry.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Model status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="p-6 border border-[#1e2a45]">
            <h3 className="text-sm font-semibold text-[#F5F7FF] mb-4">
              Astro-ML Engine Configuration
            </h3>
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/25">
                <p className="text-xs font-semibold uppercase text-purple-300 tracking-wider mb-1">
                  Classifier Architecture
                </p>
                <p className="text-sm font-medium text-[#F5F7FF]">
                  GalacticTransformer-X + Residual 1D-CNN
                </p>
                <p className="text-xs text-[#9AA6C2] mt-1 leading-relaxed">
                  Trained on multi-mission survey data with specialized losses for rare
                  astronomical events (Black Hole microlensing spikes & Exoplanet dips).
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { label: 'Target Classes', value: '4 (Star, Exoplanet, Black Hole, Asteroid)', ok: true },
                  { label: 'Multiclass Accuracy', value: '98.4%', ok: true },
                  { label: 'Survey Ingestion', value: '14,850 Catalog Curves', ok: true },
                  { label: 'FastAPI Backend', value: 'Simulated / Standalone Ready', ok: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-1 border-b border-[#1e2a45]/40">
                    <span className="text-[#9AA6C2]">{item.label}</span>
                    <span className="font-semibold text-emerald-400">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
