// ─── Celestial Classification Types ─────────────────────────────────────────

export type CelestialClass = 'STAR' | 'EXOPLANET' | 'BLACK_HOLE' | 'ASTEROID';

export type PredictedClassId = 0 | 1 | 2 | 3;

export interface ClassProbabilities {
  star: number;
  exoplanet: number;
  blackHole: number;
  asteroid: number;
}

// ─── Light Curve & Spectral Observation Data ────────────────────────────────

export interface LightCurvePoint {
  /** Observation index or time step (e.g. BJD or cadence index) */
  index: number;
  /** Measured brightness / relative flux */
  flux: number;
  /** Optional measurement error / uncertainty */
  uncertainty?: number;
}

export interface LightCurveData {
  points: LightCurvePoint[];
  /** Target identifier (e.g. Kepler-186, Cygnus X-1, Asteroid 101955) */
  targetId?: string;
  /** Target celestial type for reference */
  targetType?: CelestialClass;
  /** The column name used for brightness values */
  fluxColumn?: string;
  /** Whether values have been normalized */
  normalized?: boolean;
}

// ─── CSV Upload & Validation ────────────────────────────────────────────────

export interface CSVMeta {
  fileName: string;
  fileSize: number;
  rowCount: number;
  columnCount: number;
  columns: string[];
  /** First N rows for preview */
  previewRows: string[][];
}

export type CSVValidationStatus = 'idle' | 'validating' | 'valid' | 'invalid';

export interface CSVValidationResult {
  status: CSVValidationStatus;
  errors: string[];
  warnings: string[];
  meta?: CSVMeta;
}

// ─── Analysis ───────────────────────────────────────────────────────────────

export type AnalysisStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

export interface AnalysisRequest {
  file: File;
  fluxColumn?: string;
  normalize?: boolean;
}

export interface SignalCharacteristics {
  /** Estimated transit depth (for exoplanets) */
  dipDepth?: number;
  /** Number of periodic transit events */
  dipCount?: number;
  /** Gravitational microlensing magnification (for black holes) */
  lensingMagnification?: number;
  /** Relativistic X-ray / accretion flare index (for black holes) */
  accretionFlickerIndex?: number;
  /** Stellar flux stability percentage (for stars) */
  stellarStability?: number;
  /** Rotational light curve period in hours/cadence (for asteroids) */
  rotationalPeriod?: number;
  /** Peak-to-peak amplitude variance (for asteroids) */
  amplitudeVariance?: number;
  /** Signal-to-noise ratio */
  snr?: number;
  /** Period estimate in observation indices */
  estimatedPeriod?: number;
  /** Physical rationale note */
  astrophysicalNotes?: string;
}

export interface AnalysisResult {
  /** Unique identifier for this analysis run */
  id: string;
  /** Predicted class ID (0: Star, 1: Exoplanet, 2: Black Hole, 3: Asteroid) */
  predictedClass: PredictedClassId;
  /** Model confidence score for the predicted class [0, 1] */
  confidence: number;
  /** Human-readable celestial label */
  label: 'Star' | 'Exoplanet' | 'Black Hole' | 'Asteroid';
  /** Celestial classification enum */
  celestialType: CelestialClass;
  /** Multi-class probability distribution across all 4 celestial bodies */
  classProbabilities: ClassProbabilities;
  /** Detailed scientific explanation of the prediction */
  explanation: string;
  /** Whether this result came from a real model or simulated demo data */
  isSimulated: boolean;
  /** Signal characteristics extracted from the photometric data */
  signalCharacteristics?: SignalCharacteristics;
  /** Light curve data used for this analysis */
  lightCurve?: LightCurveData;
  /** ISO timestamp of the analysis */
  timestamp: string;
}

// ─── Analysis History ───────────────────────────────────────────────────────

export interface AnalysisHistoryRecord {
  id: string;
  fileName: string;
  targetName?: string;
  timestamp: string;
  predictedClass: PredictedClassId;
  celestialType: CelestialClass;
  confidence: number;
  label: string;
  isSimulated: boolean;
}

// ─── Model Evaluation ───────────────────────────────────────────────────────

export interface ClassSpecificMetrics {
  precision: number;
  recall: number;
  f1Score: number;
  support: number;
}

export interface ModelMetrics {
  modelName: string;
  architecture: string;
  accuracy: number;
  macroPrecision: number;
  macroRecall: number;
  macroF1: number;
  prAuc: number;
  logLoss: number;
  /** 4x4 Confusion matrix: Rows = Actual [Star, Exoplanet, Black Hole, Asteroid], Cols = Predicted */
  confusionMatrix: number[][];
  /** Per-class performance breakdown */
  perClass: {
    star: ClassSpecificMetrics;
    exoplanet: ClassSpecificMetrics;
    blackHole: ClassSpecificMetrics;
    asteroid: ClassSpecificMetrics;
  };
}

export interface ModelComparison {
  models: ModelMetrics[];
  isDemo: boolean;
}

// ─── Dataset Statistics ─────────────────────────────────────────────────────

export interface DatasetStats {
  totalSamples: number;
  starCount: number;
  exoplanetCount: number;
  blackHoleCount: number;
  asteroidCount: number;
  featuresPerSample: number;
  datasetName: string;
  datasetSource: string;
}

// ─── API Layer ──────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  isDemo?: boolean;
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

// ─── Navigation ─────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface SidebarItem {
  label: string;
  path: string;
  icon: string;
  badge?: string | number;
}
