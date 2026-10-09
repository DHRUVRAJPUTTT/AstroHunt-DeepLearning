import { motion } from 'motion/react';
import {
  BookOpen,
  LineChart,
  Brain,
  Filter,
  Download,
  Flame,
  Orbit,
  CircleDot,
  Compass,
  Sparkles,
} from 'lucide-react';
import { Card } from '../components/ui/Card';

export function ResearchPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase mb-3">
          <Sparkles size={14} />
          Astrophysical Machine Learning
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FF] flex items-center gap-3 mb-3">
          <BookOpen className="text-[#8B83FF]" />
          Research & Theoretical Methodology
        </h1>
        <p className="text-[#9AA6C2] text-base sm:text-lg leading-relaxed">
          How deep neural networks categorize deep space celestial bodies: distinguishing
          Stars, Exoplanet transits, Black Hole microlensing, and Asteroid tumbling light curves.
        </p>
      </motion.div>

      {/* The 4 Celestial Signatures Problem */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="p-6 sm:p-8 border border-[#1e2a45]">
          <h2 className="text-xl font-bold text-[#F5F7FF] mb-4">
            The Multiclass Photometric Challenge
          </h2>
          <div className="space-y-4 text-[#9AA6C2] text-sm sm:text-base leading-relaxed">
            <p>
              Observatories like Kepler, TESS, and Gaia collect millions of sequential photometric
              flux measurements. Historically, models focused on binary classification (exoplanet vs. non-exoplanet).
              However, deep space datasets contain heterogeneous celestial phenomena whose signals can easily
              confuse naive detectors.
            </p>
            <p>
              To solve this, our project builds a unified 4-class classifier targeting the primary categories of
              deep space photometric variability:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-[#101629] border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={18} className="text-amber-400" />
                <h3 className="font-bold text-[#F5F7FF] text-sm">1. Stars (Host & Main Sequence)</h3>
              </div>
              <p className="text-xs text-[#9AA6C2] leading-relaxed">
                Characterized by stationary baseline brightness with micro-variability driven by stellar
                granulation, sunspots, and coronal flares. Operates as the high-support baseline class.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#101629] border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Orbit size={18} className="text-cyan-400" />
                <h3 className="font-bold text-[#F5F7FF] text-sm">2. Exoplanet Transit Systems</h3>
              </div>
              <p className="text-xs text-[#9AA6C2] leading-relaxed">
                Periodic, symmetric geometric occultation dips. Depth depends on the planet-to-star area ratio
                (Rp/R*)^2, exhibiting characteristic limb-darkening ingress and egress curves.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#101629] border border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <CircleDot size={18} className="text-purple-400" />
                <h3 className="font-bold text-[#F5F7FF] text-sm">3. Black Hole Systems & Microlensing</h3>
              </div>
              <p className="text-xs text-[#9AA6C2] leading-relaxed">
                Gravitational microlensing (Paczyński amplification curve) causes a smooth, symmetric brightening peak
                up to multiple times baseline flux, often accompanied by high-energy accretion disk turbulence.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#101629] border border-orange-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Compass size={18} className="text-orange-400" />
                <h3 className="font-bold text-[#F5F7FF] text-sm">4. Asteroids & Minor Solar Bodies</h3>
              </div>
              <p className="text-xs text-[#9AA6C2] leading-relaxed">
                Double-peaked, non-spherical asymmetric rotational modulation caused by irregular faceted surface
                geometry reflecting changing angles of sunlight during orbital tumbling.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Pipeline Steps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-[#F5F7FF] mb-6">
          Machine Learning Pipeline Architecture
        </h2>
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[28px] sm:before:ml-[50%] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#8B83FF] via-[#63E4E8] before:to-purple-500">
          
          {/* Step 1 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#080B18] bg-[#121A2E] text-[#8B83FF] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <Download size={22} />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-[#1e2a45] bg-[#121A2E]/90 backdrop-blur-sm">
              <h3 className="font-bold text-[#F5F7FF] text-sm mb-1">1. Photometric Data Ingestion</h3>
              <p className="text-xs text-[#9AA6C2] leading-relaxed">
                Raw time-series flux measurements from Kepler, TESS, and Gaia DR3 are loaded. Each observation cadence
                contains 3,197 normalized flux measurements calibrated in physical Barycentric Julian Date (BJD).
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#080B18] bg-[#121A2E] text-[#63E4E8] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <Filter size={22} />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-[#1e2a45] bg-[#121A2E]/90 backdrop-blur-sm">
              <h3 className="font-bold text-[#F5F7FF] text-sm mb-1">2. Astrophysical Feature Extraction</h3>
              <p className="text-xs text-[#9AA6C2] leading-relaxed">
                Applies Fast Fourier Transform (FFT) for rotational periods, Box Least Squares (BLS) for exoplanet dips,
                and Paczyński parametric fitting to capture gravitational microlensing magnification parameters.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#080B18] bg-[#121A2E] text-purple-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <Brain size={22} />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-[#1e2a45] bg-[#121A2E]/90 backdrop-blur-sm">
              <h3 className="font-bold text-[#F5F7FF] text-sm mb-1">3. Deep Transformer & CNN Training</h3>
              <p className="text-xs text-[#9AA6C2] leading-relaxed">
                Multi-scale 1D Convolutional Neural Networks and Time-Series Vision Transformers are trained with Focal Loss
                and Class-Weighted Cross-Entropy to master rare event detection despite astronomical class imbalance.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#080B18] bg-[#121A2E] text-amber-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <LineChart size={22} />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-[#1e2a45] bg-[#121A2E]/90 backdrop-blur-sm">
              <h3 className="font-bold text-[#F5F7FF] text-sm mb-1">4. Multiclass Triage & Diagnostic Inference</h3>
              <p className="text-xs text-[#9AA6C2] leading-relaxed">
                Outputs calibrated softmax probabilities across all 4 celestial classes, with automatic physical metric
                extraction (transit depth, microlensing magnification, rotational period, and baseline stability).
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
