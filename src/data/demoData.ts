import type {
  LightCurvePoint,
  DatasetStats,
  ModelMetrics,
  AnalysisHistoryRecord,
  AnalysisResult,
} from '../types/analysis';

// ─── Dataset Statistics (Deep Space Astronomical Survey) ─────────────────────

export const DATASET_STATS: DatasetStats = {
  totalSamples: 14850,
  starCount: 7820,
  exoplanetCount: 3410,
  blackHoleCount: 680,
  asteroidCount: 2940,
  featuresPerSample: 3197,
  datasetName: 'Cosmic-4C: Multiclass Celestial Survey',
  datasetSource: 'NASA Kepler / TESS / Chandra / Gaia DR3 Archive',
};

// ─── Synthetic Light Curve Generators for 4 Celestial Classes ────────────────

export function generateStarLightCurve(length: number = 800): LightCurvePoint[] {
  const points: LightCurvePoint[] = [];
  const baseline = 1.0;
  for (let i = 0; i < length; i++) {
    // Stellar granulation + subtle low-frequency magnetic rotation activity
    const lowFreqRotation = Math.sin((i / length) * Math.PI * 4) * 0.0015;
    const granulationNoise = (Math.sin(i * 0.7) + Math.cos(i * 1.3)) * 0.0008;
    const photonNoise = (Math.random() - 0.5) * 0.0015;
    const flux = baseline + lowFreqRotation + granulationNoise + photonNoise;
    points.push({ index: i, flux: parseFloat(flux.toFixed(6)) });
  }
  return points;
}

export function generateExoplanetLightCurve(length: number = 800): LightCurvePoint[] {
  const points: LightCurvePoint[] = [];
  const baseline = 1.0;
  const period = 220;
  const transitWidth = 22;
  const transitDepth = 0.016; // 1.6% transit dip
  const transitCenter = period / 2;

  for (let i = 0; i < length; i++) {
    let flux = baseline + (Math.random() - 0.5) * 0.0025;
    const phase = i % period;
    const distFromCenter = Math.abs(phase - transitCenter);

    if (distFromCenter < transitWidth / 2) {
      // Limb-darkened transit profile
      const normalizedDist = distFromCenter / (transitWidth / 2);
      const dip = transitDepth * (1 - normalizedDist * normalizedDist * 0.7);
      flux -= dip;
    }

    points.push({ index: i, flux: parseFloat(flux.toFixed(6)) });
  }
  return points;
}

export function generateBlackHoleLightCurve(length: number = 800): LightCurvePoint[] {
  const points: LightCurvePoint[] = [];
  const baseline = 1.0;
  // Gravitational Microlensing event (Paczyński curve) centered around index 400
  const eventCenter = 380;
  const einsteinCrossingTime = 65; // t_E
  const minImpactParam = 0.35; // u_0

  for (let i = 0; i < length; i++) {
    // Paczyński amplification: A(u) = (u^2 + 2) / (u * sqrt(u^2 + 4))
    const tau = (i - eventCenter) / einsteinCrossingTime;
    const u = Math.sqrt(minImpactParam * minImpactParam + tau * tau);
    const magnification = (u * u + 2) / (u * Math.sqrt(u * u + 4));

    // Relativistic accretion disk turbulent flicker (turbulent X-ray/optical flaring)
    const turbulentFlicker =
      (Math.sin(i * 0.45) * Math.cos(i * 0.9) * 0.015) +
      (Math.random() > 0.96 ? (Math.random() * 0.06) : 0);

    const flux = baseline * magnification + turbulentFlicker + (Math.random() - 0.5) * 0.005;
    points.push({ index: i, flux: parseFloat(flux.toFixed(6)) });
  }
  return points;
}

export function generateAsteroidLightCurve(length: number = 800): LightCurvePoint[] {
  const points: LightCurvePoint[] = [];
  const baseline = 1.0;
  // Asymmetric double-peaked light curve caused by irregular non-spherical body rotation
  const rotationPeriod = 85; // cadences
  const primaryAmplitude = 0.075;
  const secondaryAmplitude = 0.045;

  for (let i = 0; i < length; i++) {
    const angle = ((i % rotationPeriod) / rotationPeriod) * 2 * Math.PI;
    // Primary and secondary crests from asteroid facets
    const harmonic1 = Math.sin(angle * 2) * primaryAmplitude;
    const harmonic2 = Math.cos(angle * 4 + 0.5) * secondaryAmplitude * 0.5;
    const albedoNoise = (Math.random() - 0.5) * 0.004;

    const flux = baseline + harmonic1 + harmonic2 + albedoNoise;
    points.push({ index: i, flux: parseFloat(flux.toFixed(6)) });
  }
  return points;
}

// Preset curves
export const DEMO_STAR_CURVE = generateStarLightCurve(800);
export const DEMO_EXOPLANET_CURVE = generateExoplanetLightCurve(800);
export const DEMO_BLACKHOLE_CURVE = generateBlackHoleLightCurve(800);
export const DEMO_ASTEROID_CURVE = generateAsteroidLightCurve(800);

// Default curve for quick preview
export const DEMO_TRANSIT_CURVE = DEMO_EXOPLANET_CURVE;
export const DEMO_NON_TRANSIT_CURVE = DEMO_STAR_CURVE;

// ─── Celestial Demo Presets for Quick Testing ────────────────────────────────

export interface CelestialPreset {
  id: string;
  name: string;
  designation: string;
  classType: 'STAR' | 'EXOPLANET' | 'BLACK_HOLE' | 'ASTEROID';
  description: string;
  curve: LightCurvePoint[];
  fileName: string;
}

export const CELESTIAL_PRESETS: CelestialPreset[] = [
  {
    id: 'preset-exoplanet',
    name: 'Kepler-186f',
    designation: 'KOI-571.05',
    classType: 'EXOPLANET',
    description: 'Earth-size exoplanet orbiting within the habitable zone of an M-dwarf star, exhibiting clean periodic transit dips.',
    curve: DEMO_EXOPLANET_CURVE,
    fileName: 'kepler_186f_transit.csv',
  },
  {
    id: 'preset-blackhole',
    name: 'Cygnus X-1 / OGLE-BH1',
    designation: 'HDE 226868',
    classType: 'BLACK_HOLE',
    description: 'High-mass stellar black hole system featuring extreme relativistic accretion flickering and gravitational microlensing amplification.',
    curve: DEMO_BLACKHOLE_CURVE,
    fileName: 'cygnus_x1_microlensing.csv',
  },
  {
    id: 'preset-star',
    name: 'Alpha Centauri A',
    designation: 'HD 128620',
    classType: 'STAR',
    description: 'Stable G-type main sequence star displaying baseline stellar granulation and low-amplitude chromospheric variability.',
    curve: DEMO_STAR_CURVE,
    fileName: 'alpha_centauri_stellar.csv',
  },
  {
    id: 'preset-asteroid',
    name: '101955 Bennu',
    designation: 'Asteroid 1999 RQ36',
    classType: 'ASTEROID',
    description: 'Carbonaceous near-Earth minor planet with irregular non-spherical shape causing periodic rotational tumbling variations.',
    curve: DEMO_ASTEROID_CURVE,
    fileName: 'asteroid_101955_bennu.csv',
  },
];

// ─── Demo Results for Each Class ────────────────────────────────────────────

export const PRESET_RESULTS: Record<string, AnalysisResult> = {
  EXOPLANET: {
    id: 'res-exoplanet-demo',
    predictedClass: 1,
    confidence: 0.942,
    label: 'Exoplanet',
    celestialType: 'EXOPLANET',
    classProbabilities: {
      star: 0.021,
      exoplanet: 0.942,
      blackHole: 0.008,
      asteroid: 0.029,
    },
    explanation:
      'Periodic photometric dips (depth: 1.6%) observed at consistent 220-cadence intervals. Flat-bottom ingress/egress profile matches geometric planetary transit across stellar disk.',
    isSimulated: true,
    signalCharacteristics: {
      dipDepth: 0.016,
      dipCount: 3,
      snr: 18.4,
      estimatedPeriod: 220,
      astrophysicalNotes: 'Candidate radius: ~1.12 R_Earth. Potential habitable zone orbit.',
    },
    lightCurve: {
      points: DEMO_EXOPLANET_CURVE,
      targetId: 'Kepler-186f (Candidate)',
      targetType: 'EXOPLANET',
      normalized: true,
    },
    timestamp: new Date().toISOString(),
  },
  BLACK_HOLE: {
    id: 'res-blackhole-demo',
    predictedClass: 2,
    confidence: 0.968,
    label: 'Black Hole',
    celestialType: 'BLACK_HOLE',
    classProbabilities: {
      star: 0.012,
      exoplanet: 0.004,
      blackHole: 0.968,
      asteroid: 0.016,
    },
    explanation:
      'Symmetric relativistic gravitational microlensing peak (A_max: 2.14x) detected with high-frequency accretion turbulence and relativistic beaming signature.',
    isSimulated: true,
    signalCharacteristics: {
      lensingMagnification: 2.14,
      accretionFlickerIndex: 0.88,
      snr: 24.6,
      estimatedPeriod: 65,
      astrophysicalNotes: 'Einstein crossing time t_E = 65 cadences. Mass estimate: 8.5–12 Solar Masses.',
    },
    lightCurve: {
      points: DEMO_BLACKHOLE_CURVE,
      targetId: 'Cygnus X-1 / OGLE-BH-01',
      targetType: 'BLACK_HOLE',
      normalized: true,
    },
    timestamp: new Date().toISOString(),
  },
  STAR: {
    id: 'res-star-demo',
    predictedClass: 0,
    confidence: 0.985,
    label: 'Star',
    celestialType: 'STAR',
    classProbabilities: {
      star: 0.985,
      exoplanet: 0.008,
      blackHole: 0.002,
      asteroid: 0.005,
    },
    explanation:
      'Uniform stellar flux with low-noise photometric stability (99.82%). No periodic occultation dips or relativistic amplification spikes detected.',
    isSimulated: true,
    signalCharacteristics: {
      stellarStability: 0.998,
      snr: 1.4,
      astrophysicalNotes: 'Spectral classification consistent with G2V Main Sequence stellar continuum.',
    },
    lightCurve: {
      points: DEMO_STAR_CURVE,
      targetId: 'Alpha Centauri A',
      targetType: 'STAR',
      normalized: true,
    },
    timestamp: new Date().toISOString(),
  },
  ASTEROID: {
    id: 'res-asteroid-demo',
    predictedClass: 3,
    confidence: 0.927,
    label: 'Asteroid',
    celestialType: 'ASTEROID',
    classProbabilities: {
      star: 0.032,
      exoplanet: 0.024,
      blackHole: 0.017,
      asteroid: 0.927,
    },
    explanation:
      'Asymmetric double-peaked periodic flux modulation (amplitude Δm: 0.12). Characteristic of light-curve inversion from an irregularly shaped minor planet tumbling in orbit.',
    isSimulated: true,
    signalCharacteristics: {
      rotationalPeriod: 85,
      amplitudeVariance: 0.12,
      snr: 12.8,
      astrophysicalNotes: 'Rotational period ~4.3 hours. Albedo variation consistent with carbonaceous surface facets.',
    },
    lightCurve: {
      points: DEMO_ASTEROID_CURVE,
      targetId: '101955 Bennu',
      targetType: 'ASTEROID',
      normalized: true,
    },
    timestamp: new Date().toISOString(),
  },
};

// ─── 4x4 Multi-Class Model Metrics ──────────────────────────────────────────

export const DEMO_MODEL_METRICS: ModelMetrics[] = [
  {
    modelName: 'Astro-RandomForest',
    architecture: 'Feature-Engineered Ensemble (400 Trees)',
    accuracy: 0.941,
    macroPrecision: 0.924,
    macroRecall: 0.912,
    macroF1: 0.918,
    prAuc: 0.935,
    logLoss: 0.184,
    // [Star, Exoplanet, Black Hole, Asteroid]
    confusionMatrix: [
      [752, 14, 4, 12],   // Actual Star
      [18, 312, 2, 9],    // Actual Exoplanet
      [3, 2, 58, 5],      // Actual Black Hole
      [14, 8, 3, 269],    // Actual Asteroid
    ],
    perClass: {
      star: { precision: 0.956, recall: 0.962, f1Score: 0.959, support: 782 },
      exoplanet: { precision: 0.929, recall: 0.915, f1Score: 0.922, support: 341 },
      blackHole: { precision: 0.866, recall: 0.853, f1Score: 0.859, support: 68 },
      asteroid: { precision: 0.912, recall: 0.915, f1Score: 0.913, support: 294 },
    },
  },
  {
    modelName: 'DeepCosmo 1D-CNN',
    architecture: 'Residual 1D-Convolutional Net + SE Attention',
    accuracy: 0.968,
    macroPrecision: 0.957,
    macroRecall: 0.949,
    macroF1: 0.953,
    prAuc: 0.972,
    logLoss: 0.112,
    confusionMatrix: [
      [769, 7, 1, 5],     // Actual Star
      [9, 326, 1, 5],     // Actual Exoplanet
      [1, 1, 64, 2],      // Actual Black Hole
      [6, 4, 1, 283],     // Actual Asteroid
    ],
    perClass: {
      star: { precision: 0.979, recall: 0.983, f1Score: 0.981, support: 782 },
      exoplanet: { precision: 0.964, recall: 0.956, f1Score: 0.960, support: 341 },
      blackHole: { precision: 0.955, recall: 0.941, f1Score: 0.948, support: 68 },
      asteroid: { precision: 0.959, recall: 0.963, f1Score: 0.961, support: 294 },
    },
  },
  {
    modelName: 'GalacticTransformer-X (Primary)',
    architecture: 'Multi-Scale Vision/Time-Series Transformer (AstroViT)',
    accuracy: 0.984,
    macroPrecision: 0.979,
    macroRecall: 0.976,
    macroF1: 0.977,
    prAuc: 0.989,
    logLoss: 0.058,
    confusionMatrix: [
      [777, 3, 0, 2],     // Actual Star
      [4, 334, 1, 2],     // Actual Exoplanet
      [0, 1, 66, 1],      // Actual Black Hole
      [3, 2, 1, 288],     // Actual Asteroid
    ],
    perClass: {
      star: { precision: 0.991, recall: 0.994, f1Score: 0.992, support: 782 },
      exoplanet: { precision: 0.982, recall: 0.979, f1Score: 0.981, support: 341 },
      blackHole: { precision: 0.971, recall: 0.971, f1Score: 0.971, support: 68 },
      asteroid: { precision: 0.983, recall: 0.980, f1Score: 0.981, support: 294 },
    },
  },
];

// ─── Demo Analysis History (Covering All 4 Celestial Classes) ────────────────

export const DEMO_ANALYSIS_HISTORY: AnalysisHistoryRecord[] = [
  {
    id: 'demo-bh-001',
    fileName: 'chandra_gaia_bh1_survey.csv',
    targetName: 'Gaia BH1 Candidate',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    predictedClass: 2,
    celestialType: 'BLACK_HOLE',
    confidence: 0.968,
    label: 'Black Hole',
    isSimulated: true,
  },
  {
    id: 'demo-exo-002',
    fileName: 'kepler_186f_lc_flux.csv',
    targetName: 'Kepler-186f',
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    predictedClass: 1,
    celestialType: 'EXOPLANET',
    confidence: 0.942,
    label: 'Exoplanet',
    isSimulated: true,
  },
  {
    id: 'demo-ast-003',
    fileName: 'rubin_asteroid_101955.csv',
    targetName: '101955 Bennu',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    predictedClass: 3,
    celestialType: 'ASTEROID',
    confidence: 0.927,
    label: 'Asteroid',
    isSimulated: true,
  },
  {
    id: 'demo-star-004',
    fileName: 'tess_tic_261136679.csv',
    targetName: 'Alpha Centauri A',
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    predictedClass: 0,
    celestialType: 'STAR',
    confidence: 0.985,
    label: 'Star',
    isSimulated: true,
  },
  {
    id: 'demo-exo-005',
    fileName: 'kepler_452b_habitable.csv',
    targetName: 'Kepler-452b',
    timestamp: new Date(Date.now() - 32400000).toISOString(),
    predictedClass: 1,
    celestialType: 'EXOPLANET',
    confidence: 0.915,
    label: 'Exoplanet',
    isSimulated: true,
  },
  {
    id: 'demo-bh-006',
    fileName: 'cygnus_x1_accretion_flares.csv',
    targetName: 'Cygnus X-1',
    timestamp: new Date(Date.now() - 54000000).toISOString(),
    predictedClass: 2,
    celestialType: 'BLACK_HOLE',
    confidence: 0.978,
    label: 'Black Hole',
    isSimulated: true,
  },
  {
    id: 'demo-ast-007',
    fileName: 'panstarrs_oumuamua_rot.csv',
    targetName: '1I/`Oumuamua',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    predictedClass: 3,
    celestialType: 'ASTEROID',
    confidence: 0.893,
    label: 'Asteroid',
    isSimulated: true,
  },
];

// ─── Celestial Body Informational Profiles ──────────────────────────────────

export interface CelestialProfile {
  id: 'STAR' | 'EXOPLANET' | 'BLACK_HOLE' | 'ASTEROID';
  name: string;
  tagline: string;
  color: string;
  accentColor: string;
  glowClass: string;
  signatureFeature: string;
  detectionMechanism: string;
  physicalPhenomenon: string;
  sampleObjects: string[];
}

export const CELESTIAL_PROFILES: CelestialProfile[] = [
  {
    id: 'STAR',
    name: 'Star',
    tagline: 'Luminous Stellar Nuclear Furnaces',
    color: '#F59E0B',
    accentColor: '#FDE047',
    glowClass: 'from-amber-500/20 to-yellow-500/10',
    signatureFeature: 'Stable continuum flux with microscopic granulation noise',
    detectionMechanism: 'Baseline photometric stability, spectral blackbody radiation, granulation power spectra',
    physicalPhenomenon: 'Nuclear fusion equilibrium creating steady thermal photon emission with low chromospheric variance.',
    sampleObjects: ['Betelgeuse', 'Alpha Centauri', 'Sirius A', 'Proxima Centauri'],
  },
  {
    id: 'EXOPLANET',
    name: 'Exoplanet',
    tagline: 'Worlds Beyond Our Solar System',
    color: '#06B6D4',
    accentColor: '#10B981',
    glowClass: 'from-cyan-500/20 to-emerald-500/10',
    signatureFeature: 'Periodic, symmetric geometric transit dips in light curve',
    detectionMechanism: 'Transit photometry (dimming when transiting host star), radial velocity wobbles',
    physicalPhenomenon: 'Orbital occultation blocking a minute fraction (0.01%–2%) of host star flux at fixed orbital periods.',
    sampleObjects: ['Kepler-186f', 'Kepler-452b', 'TRAPPIST-1e', 'HD 209458 b'],
  },
  {
    id: 'BLACK_HOLE',
    name: 'Black Hole',
    tagline: 'Singularities & Gravitational Wells',
    color: '#A855F7',
    accentColor: '#EC4899',
    glowClass: 'from-purple-600/30 via-pink-600/20 to-indigo-900/40',
    signatureFeature: 'Gravitational microlensing peak & relativistic accretion flicker',
    detectionMechanism: 'Einstein ring microlensing magnification, high-energy X-ray relativistic jets, accretion disk Doppler beaming',
    physicalPhenomenon: 'Extreme spacetime curvature bending background light into transient amplification spikes, paired with turbulent accretion disk matter spiraling past the event horizon.',
    sampleObjects: ['Cygnus X-1', 'Gaia BH1', 'V404 Cygni', 'Sagittarius A*'],
  },
  {
    id: 'ASTEROID',
    name: 'Asteroid',
    tagline: 'Tumbling Minor Solar System Bodies',
    color: '#F97316',
    accentColor: '#FB923C',
    glowClass: 'from-orange-500/20 to-red-500/10',
    signatureFeature: 'Asymmetric double-peaked periodic rotational modulation',
    detectionMechanism: 'Photometric rotational light curve inversion, orbital parallax, albedo variance',
    physicalPhenomenon: 'Irregular, non-spherical rubble-pile geometry rotating along an axis, reflecting variable amounts of sunlight as distinct facets turn toward observers.',
    sampleObjects: ['101955 Bennu', '433 Eros', '1I/`Oumuamua', '16 Psyche'],
  },
];

// ─── Landing Page Features ──────────────────────────────────────────────────

export const FEATURES = [
  {
    title: 'Multi-Class Deep Space Classifier',
    description:
      'Advanced 4-class neural architecture specifically trained to differentiate Stars, Exoplanet transits, Black Hole microlensing, and Asteroid rotational tumbling.',
    icon: 'Brain',
  },
  {
    title: 'Gravitational Microlensing & Transit Engine',
    description:
      'Extract relativistic Einstein crossing times, transit ingress/egress slopes, and tumbling Fourier harmonics with specialized scientific signal processing.',
    icon: 'Activity',
  },
  {
    title: 'Interactive Photometric Visualizer',
    description:
      'High-cadence Plotly time-series inspects raw flux measurements, normalized curves, confidence bounds, and multi-class probability vectors.',
    icon: 'LineChart',
  },
  {
    title: 'Astronomical Evaluation Benchmarks',
    description:
      'Full 4x4 Confusion Matrix, Macro-averaged Precision/Recall/F1, and per-class performance analytics designed for astrophysical discovery.',
    icon: 'BarChart3',
  },
] as const;

// ─── Transit & Detection Pipeline Steps ─────────────────────────────────────

export const ASTRO_DETECTION_STEPS = [
  {
    step: 1,
    title: 'Deep Space Photometry Ingestion',
    description:
      'Space observatories (Kepler, TESS, Gaia, Rubin) record billions of flux measurements across stellar fields and deep cosmic quadrants.',
    icon: 'Telescope',
  },
  {
    step: 2,
    title: 'Morphological Signature Extraction',
    description:
      'Algorithms isolate distinctive patterns: U-shaped exoplanet dips, Paczyński microlensing peaks, symmetric rotation curves, or flat stellar baselines.',
    icon: 'Waveform',
  },
  {
    step: 3,
    title: 'Multiclass Neural Classification',
    description:
      'Deep 1D-CNN and Transformer models output calibrated posterior probabilities for Star, Exoplanet, Black Hole, or Asteroid classification.',
    icon: 'Sparkles',
  },
] as const;
