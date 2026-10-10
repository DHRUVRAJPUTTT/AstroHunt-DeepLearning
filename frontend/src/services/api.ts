import type {
  ApiResponse,
  AnalysisResult,
  ModelMetrics,
  AnalysisHistoryRecord,
  CSVValidationResult,
  CelestialClass,
  PredictedClassId,
} from '../types/analysis';
import {
  DEMO_MODEL_METRICS,
  DEMO_ANALYSIS_HISTORY,
  PRESET_RESULTS,
  DEMO_STAR_CURVE,
  DEMO_EXOPLANET_CURVE,
  DEMO_BLACKHOLE_CURVE,
  DEMO_ASTEROID_CURVE,
} from '../data/demoData';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const FORCE_DEMO =
  import.meta.env.VITE_FORCE_DEMO_MODE === 'true';

// ─── Helpers ────────────────────────────────────────────────────────────────

async function isDemoMode(): Promise<boolean> {
  if (FORCE_DEMO) return true;
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      signal: AbortSignal.timeout(2000),
    });
    return !res.ok;
  } catch {
    return true;
  }
}

async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
      signal: options?.signal ?? AbortSignal.timeout(30000),
    });
    if (!res.ok) {
      const errorBody = await res.text().catch(() => '');
      return {
        success: false,
        error: `HTTP ${res.status}: ${errorBody || res.statusText}`,
      };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Network error';
    return { success: false, error: message };
  }
}

// ─── CSV Validation ─────────────────────────────────────────────────────────

export async function validateCSV(
  file: File
): Promise<ApiResponse<CSVValidationResult>> {
  const demo = await isDemoMode();
  if (!demo) {
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch(`${API_BASE_URL}/validate-csv`, {
        method: 'POST',
        body: form,
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok)
        return {
          success: false,
          error: `HTTP ${res.status}: ${res.statusText}`,
        };
      const data = await res.json();
      return { success: true, data, isDemo: false };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Validation failed',
      };
    }
  }

  // Demo validation – basic client-side checks
  return {
    success: true,
    data: {
      status: 'valid',
      errors: [],
      warnings: ['Running in simulation mode — multi-class celestial classifier active.'],
    },
    isDemo: true,
  };
}

// ─── Analyze Light Curve (Multiclass: Star, Exoplanet, Black Hole, Asteroid) ─

export async function analyzeLightCurve(
  file: File,
  fluxColumn?: string
): Promise<ApiResponse<AnalysisResult>> {
  const demo = await isDemoMode();
  if (!demo) {
    const form = new FormData();
    form.append('file', file);
    if (fluxColumn) form.append('flux_column', fluxColumn);
    try {
      const res = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        body: form,
        signal: AbortSignal.timeout(60000),
      });
      if (!res.ok)
        return {
          success: false,
          error: `HTTP ${res.status}: ${res.statusText}`,
        };
      const data = await res.json();
      return { success: true, data, isDemo: false };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Analysis failed',
      };
    }
  }

  // Simulation delay for realistic AI feel
  await new Promise((r) => setTimeout(r, 1600));

  const lowerName = file.name.toLowerCase();

  // Match file name if it corresponds to one of the celestial types
  let targetClass: CelestialClass;
  if (lowerName.includes('blackhole') || lowerName.includes('black_hole') || lowerName.includes('bh') || lowerName.includes('cygnus')) {
    targetClass = 'BLACK_HOLE';
  } else if (lowerName.includes('exoplanet') || lowerName.includes('transit') || lowerName.includes('kepler')) {
    targetClass = 'EXOPLANET';
  } else if (lowerName.includes('asteroid') || lowerName.includes('bennu') || lowerName.includes('minor')) {
    targetClass = 'ASTEROID';
  } else if (lowerName.includes('star') || lowerName.includes('centauri') || lowerName.includes('stellar')) {
    targetClass = 'STAR';
  } else {
    // Random selection weighted across the 4 classes
    const classes: CelestialClass[] = ['STAR', 'EXOPLANET', 'BLACK_HOLE', 'ASTEROID'];
    targetClass = classes[Math.floor(Math.random() * classes.length)];
  }

  // Use matching preset result template with fresh dynamic metadata
  const baseResult = PRESET_RESULTS[targetClass];
  const classIdMap: Record<CelestialClass, PredictedClassId> = {
    STAR: 0,
    EXOPLANET: 1,
    BLACK_HOLE: 2,
    ASTEROID: 3,
  };

  const confidenceScore = parseFloat((0.88 + Math.random() * 0.11).toFixed(3));
  const remaining = 1 - confidenceScore;
  const p1 = parseFloat((remaining * 0.5).toFixed(3));
  const p2 = parseFloat((remaining * 0.3).toFixed(3));
  const p3 = parseFloat((remaining - p1 - p2).toFixed(3));

  const probs = {
    star: targetClass === 'STAR' ? confidenceScore : p1,
    exoplanet: targetClass === 'EXOPLANET' ? confidenceScore : p2,
    blackHole: targetClass === 'BLACK_HOLE' ? confidenceScore : p3,
    asteroid: targetClass === 'ASTEROID' ? confidenceScore : p1,
  };

  const result: AnalysisResult = {
    ...baseResult,
    id: `astro-run-${Date.now()}`,
    predictedClass: classIdMap[targetClass],
    confidence: confidenceScore,
    classProbabilities: probs,
    lightCurve: {
      points:
        targetClass === 'BLACK_HOLE'
          ? DEMO_BLACKHOLE_CURVE
          : targetClass === 'EXOPLANET'
          ? DEMO_EXOPLANET_CURVE
          : targetClass === 'ASTEROID'
          ? DEMO_ASTEROID_CURVE
          : DEMO_STAR_CURVE,
      targetId: file.name.replace(/\.[^/.]+$/, ''),
      targetType: targetClass,
      normalized: true,
    },
    timestamp: new Date().toISOString(),
  };

  return { success: true, data: result, isDemo: true };
}

// ─── Model Metrics ──────────────────────────────────────────────────────────

export async function getModelMetrics(): Promise<
  ApiResponse<{ models: ModelMetrics[]; isDemo: boolean }>
> {
  const demo = await isDemoMode();
  if (!demo) {
    return apiFetch('/metrics');
  }

  return {
    success: true,
    data: { models: DEMO_MODEL_METRICS, isDemo: true },
    isDemo: true,
  };
}

// ─── Analysis History ───────────────────────────────────────────────────────

export async function getAnalysisHistory(): Promise<
  ApiResponse<AnalysisHistoryRecord[]>
> {
  const demo = await isDemoMode();
  if (!demo) {
    return apiFetch('/history');
  }

  return {
    success: true,
    data: DEMO_ANALYSIS_HISTORY,
    isDemo: true,
  };
}

// ─── Health check ───────────────────────────────────────────────────────────

export async function checkBackendHealth(): Promise<boolean> {
  if (FORCE_DEMO) return false;
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      signal: AbortSignal.timeout(2000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
