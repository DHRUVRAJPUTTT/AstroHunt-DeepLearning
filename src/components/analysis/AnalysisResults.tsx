import {
  Sparkles,
  Info,
  Radio,
  Orbit,
  Flame,
  CircleDot,
  Compass,
} from 'lucide-react';
import type { AnalysisResult, CelestialClass } from '../../types/analysis';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

interface CelestialTheme {
  icon: typeof Sparkles;
  label: string;
  badgeVariant: 'warning' | 'info' | 'purple' | 'success';
  borderColor: string;
  bgGlow: string;
  textColor: string;
  barColor: string;
}

const CELESTIAL_THEMES: Record<CelestialClass, CelestialTheme> = {
  STAR: {
    icon: Flame,
    label: 'Star (Host / Main Sequence)',
    badgeVariant: 'warning',
    borderColor: 'border-amber-500/30',
    bgGlow: 'bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent',
    textColor: 'text-amber-400',
    barColor: '#F59E0B',
  },
  EXOPLANET: {
    icon: Orbit,
    label: 'Exoplanet Transit Candidate',
    badgeVariant: 'success',
    borderColor: 'border-cyan-500/30',
    bgGlow: 'bg-gradient-to-r from-cyan-500/10 via-emerald-500/5 to-transparent',
    textColor: 'text-cyan-400',
    barColor: '#06B6D4',
  },
  BLACK_HOLE: {
    icon: CircleDot,
    label: 'Black Hole Singularity / Microlens',
    badgeVariant: 'purple',
    borderColor: 'border-purple-500/40',
    bgGlow: 'bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-indigo-950/20',
    textColor: 'text-purple-400',
    barColor: '#A855F7',
  },
  ASTEROID: {
    icon: Compass,
    label: 'Asteroid / Minor Solar System Body',
    badgeVariant: 'info',
    borderColor: 'border-orange-500/30',
    bgGlow: 'bg-gradient-to-r from-orange-500/10 via-red-500/5 to-transparent',
    textColor: 'text-orange-400',
    barColor: '#F97316',
  },
};

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const celestialType: CelestialClass =
    result.celestialType ||
    (result.predictedClass === 0
      ? 'STAR'
      : result.predictedClass === 1
      ? 'EXOPLANET'
      : result.predictedClass === 2
      ? 'BLACK_HOLE'
      : 'ASTEROID');

  const theme = CELESTIAL_THEMES[celestialType] || CELESTIAL_THEMES.STAR;
  const IconComponent = theme.icon;

  const probs = result.classProbabilities || {
    star: celestialType === 'STAR' ? result.confidence : 0.05,
    exoplanet: celestialType === 'EXOPLANET' ? result.confidence : 0.05,
    blackHole: celestialType === 'BLACK_HOLE' ? result.confidence : 0.05,
    asteroid: celestialType === 'ASTEROID' ? result.confidence : 0.05,
  };

  return (
    <div className="space-y-4">
      {/* Primary Classification Banner */}
      <Card className={`p-6 relative overflow-hidden border ${theme.borderColor}`}>
        <div className={`absolute inset-0 ${theme.bgGlow} pointer-events-none`} />
        
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-4 rounded-2xl bg-[#080B18]/80 border ${theme.borderColor} ${theme.textColor} shrink-0 shadow-lg`}>
              <IconComponent size={34} className="animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs uppercase tracking-widest text-[#9AA6C2] font-mono">
                  Celestial Classification
                </span>
                <Badge variant={theme.badgeVariant} size="sm">
                  Class {result.predictedClass} · {result.label}
                </Badge>
                {result.isSimulated && (
                  <Badge variant="demo" size="sm">Simulated Pipeline</Badge>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FF] mt-1 tracking-tight">
                {result.label.toUpperCase()} DETECTED
              </h3>

              <p className="text-sm text-[#9AA6C2] mt-2 max-w-2xl leading-relaxed">
                {result.explanation}
              </p>
            </div>
          </div>

          <div className="sm:text-right shrink-0 p-4 rounded-xl bg-[#101629]/80 border border-[#1e2a45]">
            <p className="text-xs uppercase tracking-wider text-[#9AA6C2]">
              Classification Confidence
            </p>
            <p className={`text-3xl sm:text-4xl font-extrabold mt-0.5 ${theme.textColor}`}>
              {(result.confidence * 100).toFixed(1)}%
            </p>
            <p className="text-[11px] text-[#9AA6C2] mt-0.5">
              Posterior Probability P(Y|X)
            </p>
          </div>
        </div>
      </Card>

      {/* 4-Class Probability Vector Distribution */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold text-[#F5F7FF] uppercase tracking-wider flex items-center gap-2">
            <Radio size={14} className="text-[#8B83FF]" />
            Multiclass Probability Vector
          </h4>
          <span className="text-xs text-[#9AA6C2]">Softmax Distribution</span>
        </div>

        {/* Stacked bar */}
        <div className="w-full h-3 bg-[#101629] rounded-full overflow-hidden flex border border-[#1e2a45]">
          <div
            title={`Star: ${(probs.star * 100).toFixed(1)}%`}
            style={{ width: `${probs.star * 100}%`, backgroundColor: '#F59E0B' }}
            className="transition-all duration-700 hover:brightness-125"
          />
          <div
            title={`Exoplanet: ${(probs.exoplanet * 100).toFixed(1)}%`}
            style={{ width: `${probs.exoplanet * 100}%`, backgroundColor: '#06B6D4' }}
            className="transition-all duration-700 hover:brightness-125"
          />
          <div
            title={`Black Hole: ${(probs.blackHole * 100).toFixed(1)}%`}
            style={{ width: `${probs.blackHole * 100}%`, backgroundColor: '#A855F7' }}
            className="transition-all duration-700 hover:brightness-125"
          />
          <div
            title={`Asteroid: ${(probs.asteroid * 100).toFixed(1)}%`}
            style={{ width: `${probs.asteroid * 100}%`, backgroundColor: '#F97316' }}
            className="transition-all duration-700 hover:brightness-125"
          />
        </div>

        {/* 4 Class Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { name: 'Star', prob: probs.star, color: '#F59E0B', text: 'text-amber-400' },
            { name: 'Exoplanet', prob: probs.exoplanet, color: '#06B6D4', text: 'text-cyan-400' },
            { name: 'Black Hole', prob: probs.blackHole, color: '#A855F7', text: 'text-purple-400' },
            { name: 'Asteroid', prob: probs.asteroid, color: '#F97316', text: 'text-orange-400' },
          ].map((item) => (
            <div
              key={item.name}
              className={`p-3 rounded-lg border transition-all ${
                result.label.toLowerCase() === item.name.toLowerCase()
                  ? 'bg-[#151f38] border-[#8B83FF]/50 shadow-md'
                  : 'bg-[#101629]/60 border-[#1e2a45]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[#9AA6C2] font-medium flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </span>
                <span className={`font-mono font-bold ${item.text}`}>
                  {(item.prob * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#080B18] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${item.prob * 100}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Extracted Signal & Astrophysical Characteristics */}
      {result.signalCharacteristics && (
        <Card className="p-5">
          <h4 className="text-xs font-semibold text-[#9AA6C2] uppercase tracking-wider mb-3">
            Photometric & Relativistic Signatures
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {result.signalCharacteristics.dipDepth !== undefined && (
              <div className="p-3 rounded-lg bg-[#101629] border border-[#1e2a45]">
                <p className="text-xs text-[#9AA6C2]">Transit Dip Depth</p>
                <p className="text-base font-semibold text-cyan-400 mt-0.5">
                  {(result.signalCharacteristics.dipDepth * 100).toFixed(3)}%
                </p>
                <p className="text-[10px] text-[#9AA6C2] mt-0.5">Flux reduction</p>
              </div>
            )}

            {result.signalCharacteristics.lensingMagnification !== undefined && (
              <div className="p-3 rounded-lg bg-[#101629] border border-[#1e2a45]">
                <p className="text-xs text-[#9AA6C2]">Microlensing Peak (A_max)</p>
                <p className="text-base font-semibold text-purple-400 mt-0.5">
                  {result.signalCharacteristics.lensingMagnification.toFixed(2)}×
                </p>
                <p className="text-[10px] text-[#9AA6C2] mt-0.5">Gravitational magnification</p>
              </div>
            )}

            {result.signalCharacteristics.rotationalPeriod !== undefined && (
              <div className="p-3 rounded-lg bg-[#101629] border border-[#1e2a45]">
                <p className="text-xs text-[#9AA6C2]">Rotational Period</p>
                <p className="text-base font-semibold text-orange-400 mt-0.5">
                  {result.signalCharacteristics.rotationalPeriod} cadences
                </p>
                <p className="text-[10px] text-[#9AA6C2] mt-0.5">Tumbling cycle</p>
              </div>
            )}

            {result.signalCharacteristics.stellarStability !== undefined && (
              <div className="p-3 rounded-lg bg-[#101629] border border-[#1e2a45]">
                <p className="text-xs text-[#9AA6C2]">Stellar Stability</p>
                <p className="text-base font-semibold text-amber-400 mt-0.5">
                  {(result.signalCharacteristics.stellarStability * 100).toFixed(2)}%
                </p>
                <p className="text-[10px] text-[#9AA6C2] mt-0.5">Continuum flux index</p>
              </div>
            )}

            {result.signalCharacteristics.snr !== undefined && (
              <div className="p-3 rounded-lg bg-[#101629] border border-[#1e2a45]">
                <p className="text-xs text-[#9AA6C2]">Signal-to-Noise (SNR)</p>
                <p className="text-base font-semibold text-[#F5F7FF] mt-0.5">
                  {result.signalCharacteristics.snr.toFixed(1)} dB
                </p>
                <p className="text-[10px] text-[#9AA6C2] mt-0.5">Statistical significance</p>
              </div>
            )}

            {result.signalCharacteristics.estimatedPeriod !== undefined && (
              <div className="p-3 rounded-lg bg-[#101629] border border-[#1e2a45]">
                <p className="text-xs text-[#9AA6C2]">Estimated Period</p>
                <p className="text-base font-semibold text-[#F5F7FF] mt-0.5">
                  {result.signalCharacteristics.estimatedPeriod} cadences
                </p>
                <p className="text-[10px] text-[#9AA6C2] mt-0.5">Keplerian orbit cadence</p>
              </div>
            )}
          </div>

          {result.signalCharacteristics.astrophysicalNotes && (
            <div className="mt-4 p-3 rounded-lg bg-[#101629] border border-[#1e2a45] text-xs text-[#9AA6C2]">
              <span className="font-semibold text-[#F5F7FF]">Astrophysical Context: </span>
              {result.signalCharacteristics.astrophysicalNotes}
            </div>
          )}
        </Card>
      )}

      {/* Verification Notice */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-[#101629] border border-[#1e2a45]">
        <Info size={16} className="text-[#8B83FF] mt-0.5 shrink-0" />
        <p className="text-xs text-[#9AA6C2] leading-relaxed">
          <strong>Astronomical Validation Note:</strong> This model provides automated
          first-order candidate triage for large-scale cosmological surveys. Real-world
          validation requires multi-band spectrometry (e.g. James Webb Space Telescope,
          VLT HARPS, or Event Horizon Telescope array) and follow-up radial velocity measurements.
        </p>
      </div>
    </div>
  );
}
