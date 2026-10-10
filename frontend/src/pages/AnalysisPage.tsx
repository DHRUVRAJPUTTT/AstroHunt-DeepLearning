import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Telescope,
  FlaskConical,
  RotateCcw,
  Sparkles,
  Flame,
  Orbit,
  CircleDot,
  Compass,
  FileSpreadsheet,
} from 'lucide-react';
import { useCSVUpload } from '../hooks/useCSVUpload';
import { analyzeLightCurve } from '../services/api';
import { CSVUploader } from '../components/analysis/CSVUploader';
import { CSVPreview } from '../components/analysis/CSVPreview';
import { AnalysisResults } from '../components/analysis/AnalysisResults';
import { LightCurveChart } from '../components/charts/LightCurveChart';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { LoadingState } from '../components/ui/LoadingState';
import { DemoIndicator } from '../components/ui/DemoIndicator';
import { toast } from '../components/ui/Toast';
import { CELESTIAL_PRESETS, PRESET_RESULTS, type CelestialPreset } from '../data/demoData';
import type { AnalysisResult, AnalysisStatus } from '../types/analysis';

export function AnalysisPage() {
  const { file, meta, validation, isLoading: csvLoading, handleFile, reset } =
    useCSVUpload();
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [activePreset, setActivePreset] = useState<CelestialPreset | null>(null);

  const canAnalyze =
    (file !== null && validation.status === 'valid') || activePreset !== null;

  async function handleAnalyze() {
    setAnalysisStatus('processing');
    setResult(null);

    try {
      if (activePreset) {
        // Preset simulation
        await new Promise((r) => setTimeout(r, 1200));
        const presetResult = PRESET_RESULTS[activePreset.classType];
        setResult(presetResult);
        setAnalysisStatus('complete');
        toast(
          'success',
          'Preset Classified',
          `Model classified target as: ${presetResult.label}`
        );
        return;
      }

      if (!file) return;
      const response = await analyzeLightCurve(file, selectedColumn || undefined);
      if (response.success && response.data) {
        setResult(response.data);
        setAnalysisStatus('complete');
        if (response.isDemo) {
          toast('info', 'Deep Space Classifier', `Identified: ${response.data.label}`);
        } else {
          toast(
            'success',
            'Analysis Complete',
            `Predicted Celestial Class: ${response.data.label}`
          );
        }
      } else {
        setAnalysisStatus('error');
        toast('error', 'Analysis Failed', response.error || 'Unknown error');
      }
    } catch {
      setAnalysisStatus('error');
      toast('error', 'Analysis Failed', 'An unexpected error occurred.');
    }
  }

  function handleSelectPreset(preset: CelestialPreset) {
    setActivePreset(preset);
    reset(); // reset file upload if any
    setResult(null);
    setAnalysisStatus('idle');
  }

  function handleReset() {
    reset();
    setActivePreset(null);
    setResult(null);
    setAnalysisStatus('idle');
    setSelectedColumn('');
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#F5F7FF] flex items-center gap-2">
            <Telescope size={24} className="text-[#8B83FF]" />
            Deep Space Celestial Classifier
          </h1>
          <p className="text-sm text-[#9AA6C2] mt-1">
            Classify whether a light curve is a <strong>Star</strong>, <strong>Exoplanet</strong>,{' '}
            <strong>Black Hole</strong>, or <strong>Asteroid</strong>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DemoIndicator />
          {(file || result || activePreset) && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw size={14} />
              Reset Lab
            </Button>
          )}
        </div>
      </motion.div>

      {/* ── Quick Astronomical Preset Selector ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <Card className="p-5 border border-purple-500/30 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-purple-400" />
              <h2 className="text-sm font-semibold text-[#F5F7FF]">
                Quick Test: Curated Celestial Datasets
              </h2>
            </div>
            <span className="text-xs text-[#9AA6C2]">Select to test classification</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CELESTIAL_PRESETS.map((preset) => {
              const isSelected = activePreset?.id === preset.id;
              const Icon =
                preset.classType === 'BLACK_HOLE'
                  ? CircleDot
                  : preset.classType === 'EXOPLANET'
                  ? Orbit
                  : preset.classType === 'STAR'
                  ? Flame
                  : Compass;

              const colorClass =
                preset.classType === 'BLACK_HOLE'
                  ? 'text-purple-400'
                  : preset.classType === 'EXOPLANET'
                  ? 'text-cyan-400'
                  : preset.classType === 'STAR'
                  ? 'text-amber-400'
                  : 'text-orange-400';

              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-[#182042] border-[#8B83FF] shadow-lg shadow-purple-600/20'
                      : 'bg-[#101629] border-[#1e2a45] hover:border-[#2a3860] hover:bg-[#131b33]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#F5F7FF] flex items-center gap-1.5">
                      <Icon size={14} className={colorClass} />
                      {preset.name}
                    </span>
                    <Badge
                      variant={
                        preset.classType === 'BLACK_HOLE'
                          ? 'purple'
                          : preset.classType === 'EXOPLANET'
                          ? 'success'
                          : preset.classType === 'STAR'
                          ? 'warning'
                          : 'info'
                      }
                      size="sm"
                    >
                      {preset.classType.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-[#9AA6C2] line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* ── Preset Preview If Selected ─────────────────────────────────── */}
      {activePreset && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-4 border border-[#2a3860]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={16} className="text-[#63E4E8]" />
                <span className="text-sm font-semibold text-[#F5F7FF]">
                  Loaded Preset: {activePreset.name} ({activePreset.fileName})
                </span>
                <Badge variant="demo" size="sm">Pre-Loaded Cadence</Badge>
              </div>
              <Button
                size="sm"
                onClick={handleAnalyze}
                disabled={analysisStatus === 'processing'}
              >
                <FlaskConical size={14} />
                Classify Target Now
              </Button>
            </div>
            <LightCurveChart
              points={activePreset.curve}
              title={`${activePreset.name} — Photometric Ingestion Preview`}
              height={260}
            />
          </Card>
        </motion.div>
      )}

      {/* ── Upload Section (if no preset active) ──────────────────────── */}
      {!activePreset && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-base font-semibold text-[#F5F7FF]">
                Or Upload Custom Stellar CSV
              </h2>
              {validation.status === 'valid' && (
                <Badge variant="success" size="sm">
                  Valid CSV
                </Badge>
              )}
            </div>
            <CSVUploader
              onFileAccepted={handleFile}
              validation={validation}
              isLoading={csvLoading}
              currentFile={file}
            />
          </Card>
        </motion.div>
      )}

      {/* CSV Preview */}
      {meta && validation.status === 'valid' && !activePreset && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-base font-semibold text-[#F5F7FF] mb-3">
            2. Preview & Configure Columns
          </h2>
          <CSVPreview meta={meta} />

          {meta.columns.length > 1 && (
            <Card className="p-4 mt-3">
              <label
                htmlFor="flux-column-select"
                className="block text-xs font-medium text-[#9AA6C2] mb-2"
              >
                Select flux / brightness column (optional)
              </label>
              <select
                id="flux-column-select"
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 bg-[#101629] border border-[#2a3352] rounded-lg text-sm text-[#F5F7FF] focus:outline-none focus:ring-2 focus:ring-[#8B83FF] focus:border-transparent"
              >
                <option value="">Auto-detect flux column</option>
                {meta.columns.map((col, i) => (
                  <option key={i} value={col}>
                    {col || `Column ${i}`}
                  </option>
                ))}
              </select>
            </Card>
          )}
        </motion.div>
      )}

      {/* Analyze button for CSV uploads */}
      {canAnalyze && !activePreset && analysisStatus !== 'complete' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-6 text-center border border-[#1e2a45]">
            <h2 className="text-base font-semibold text-[#F5F7FF] mb-2">
              Run Multiclass Inference
            </h2>
            <p className="text-sm text-[#9AA6C2] mb-4 max-w-md mx-auto">
              Execute neural network inference to classify target as Star, Exoplanet,
              Black Hole, or Asteroid.
            </p>
            <Button
              size="lg"
              onClick={handleAnalyze}
              className="shadow-lg shadow-purple-600/25"
            >
              <FlaskConical size={18} />
              Run Multiclass Celestial Classifier
            </Button>
          </Card>
        </motion.div>
      )}

      {/* Processing State */}
      {analysisStatus === 'processing' && (
        <Card className="p-10 border border-[#2a3860]">
          <LoadingState
            message="Processing telemetry... Testing against Star, Exoplanet, Black Hole, and Asteroid signatures..."
            size="lg"
          />
        </Card>
      )}

      {/* Results */}
      {result && analysisStatus === 'complete' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#F5F7FF] flex items-center gap-2">
              <Sparkles size={18} className="text-[#8B83FF]" />
              Inference & Astrophysical Diagnostics
            </h2>
            <Button variant="secondary" size="sm" onClick={handleReset}>
              <RotateCcw size={14} />
              Analyze Another Object
            </Button>
          </div>

          {result.lightCurve && (
            <Card className="p-4 border border-[#1e2a45]">
              <LightCurveChart
                points={result.lightCurve.points}
                title={`Analyzed Observation — ${result.lightCurve.targetId || 'Uploaded Light Curve'}`}
                height={350}
                showRangeslider
              />
            </Card>
          )}

          <AnalysisResults result={result} />
        </motion.div>
      )}

      {/* Error State */}
      {analysisStatus === 'error' && (
        <Card className="p-6 text-center border border-red-500/30">
          <p className="text-red-400 text-sm mb-3">
            Inference failed. Please verify your observation data and try again.
          </p>
          <Button variant="secondary" size="sm" onClick={handleReset}>
            Reset & Retry
          </Button>
        </Card>
      )}
    </div>
  );
}
