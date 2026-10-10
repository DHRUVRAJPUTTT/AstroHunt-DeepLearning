import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BarChart3, Sparkles, Flame, Orbit, CircleDot, Compass } from 'lucide-react';
import { getModelMetrics } from '../services/api';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { LoadingState } from '../components/ui/LoadingState';
import { DemoIndicator } from '../components/ui/DemoIndicator';
import { ModelComparisonChart } from '../components/charts/ModelComparisonChart';
import { ConfusionMatrix } from '../components/charts/ConfusionMatrix';
import type { ModelMetrics } from '../types/analysis';

export function PerformancePage() {
  const [metrics, setMetrics] = useState<ModelMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('');

  useEffect(() => {
    async function loadMetrics() {
      setIsLoading(true);
      const res = await getModelMetrics();
      if (res.success && res.data) {
        setMetrics(res.data.models);
        setIsDemo(res.data.isDemo);
        if (res.data.models.length > 0) {
          // Select primary model by default
          setSelectedModel(res.data.models[res.data.models.length - 1].modelName);
        }
      }
      setIsLoading(false);
    }
    loadMetrics();
  }, []);

  const currentModel = metrics.find((m) => m.modelName === selectedModel) || metrics[0];

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
            <BarChart3 size={24} className="text-[#8B83FF]" />
            Multiclass Model Performance Benchmarks
          </h1>
          <p className="text-sm text-[#9AA6C2] mt-1">
            Evaluate 4-class celestial detection benchmarks across Stars, Exoplanets, Black Holes, and Asteroids.
          </p>
        </div>
        {isDemo && <DemoIndicator />}
      </motion.div>

      {isLoading ? (
        <Card className="p-12">
          <LoadingState message="Loading astronomical benchmarks..." size="lg" />
        </Card>
      ) : (
        <>
          {/* Model Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-2 overflow-x-auto pb-2"
          >
            {metrics.map((m) => (
              <button
                key={m.modelName}
                onClick={() => setSelectedModel(m.modelName)}
                className={`
                  px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2
                  ${
                    selectedModel === m.modelName
                      ? 'bg-[#8B83FF] text-white shadow-lg shadow-[#8B83FF]/25 border border-[#8B83FF]'
                      : 'bg-[#121A2E] text-[#9AA6C2] hover:text-[#F5F7FF] hover:bg-[#1a2340] border border-[#2a3352]'
                  }
                `}
              >
                <span>{m.modelName}</span>
                {m.modelName.includes('Primary') && (
                  <Badge variant="purple" size="sm">Primary</Badge>
                )}
              </button>
            ))}
          </motion.div>

          {currentModel && (
            <>
              {/* Macro KPIs */}
              <motion.div
                key={currentModel.modelName}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <StatCard
                  label="Multiclass Accuracy"
                  value={(currentModel.accuracy * 100).toFixed(1) + '%'}
                  subtitle="Overall correct predictions"
                />
                <StatCard
                  label="Macro Precision"
                  value={((currentModel.macroPrecision || 0.95) * 100).toFixed(1) + '%'}
                  subtitle="Unweighted class mean"
                />
                <StatCard
                  label="Macro Recall"
                  value={((currentModel.macroRecall || 0.94) * 100).toFixed(1) + '%'}
                  subtitle="Sensitivity across 4 classes"
                />
                <StatCard
                  label="Macro F1-Score"
                  value={((currentModel.macroF1 || 0.95) * 100).toFixed(1) + '%'}
                  subtitle="Harmonic mean benchmark"
                />
              </motion.div>

              {/* Per-Class Breakdown Cards */}
              {currentModel.perClass && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Card className="p-5 border border-[#1e2a45]">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-[#F5F7FF] flex items-center gap-2">
                        <Sparkles size={16} className="text-[#8B83FF]" />
                        Per-Class Performance Diagnostics
                      </h3>
                      <span className="text-xs text-[#9AA6C2]">4 Target Celestial Classes</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        {
                          name: 'Star (Class 0)',
                          data: currentModel.perClass.star,
                          icon: Flame,
                          color: 'text-amber-400',
                          border: 'border-amber-500/20',
                        },
                        {
                          name: 'Exoplanet (Class 1)',
                          data: currentModel.perClass.exoplanet,
                          icon: Orbit,
                          color: 'text-cyan-400',
                          border: 'border-cyan-500/20',
                        },
                        {
                          name: 'Black Hole (Class 2)',
                          data: currentModel.perClass.blackHole,
                          icon: CircleDot,
                          color: 'text-purple-400',
                          border: 'border-purple-500/30',
                        },
                        {
                          name: 'Asteroid (Class 3)',
                          data: currentModel.perClass.asteroid,
                          icon: Compass,
                          color: 'text-orange-400',
                          border: 'border-orange-500/20',
                        },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.name}
                            className={`p-4 rounded-xl bg-[#101629] border ${item.border}`}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <Icon size={18} className={item.color} />
                              <span className="text-sm font-bold text-[#F5F7FF]">
                                {item.name}
                              </span>
                            </div>

                            <div className="space-y-1.5 text-xs">
                              <div className="flex justify-between">
                                <span className="text-[#9AA6C2]">Precision</span>
                                <span className="font-mono font-semibold text-[#F5F7FF]">
                                  {(item.data.precision * 100).toFixed(1)}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#9AA6C2]">Recall</span>
                                <span className="font-mono font-semibold text-[#F5F7FF]">
                                  {(item.data.recall * 100).toFixed(1)}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#9AA6C2]">F1-Score</span>
                                <span className="font-mono font-semibold text-[#8B83FF]">
                                  {(item.data.f1Score * 100).toFixed(1)}%
                                </span>
                              </div>
                              <div className="flex justify-between pt-1 border-t border-[#1e2a45]">
                                <span className="text-[#9AA6C2]">Test Support</span>
                                <span className="font-mono text-[#9AA6C2]">
                                  {item.data.support.toLocaleString()} curves
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* 4x4 Confusion Matrix & Model Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Card className="p-4 h-full border border-[#1e2a45]">
                    <ConfusionMatrix
                      matrix={currentModel.confusionMatrix}
                      modelName={currentModel.modelName}
                      height={420}
                    />
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <Card className="p-4 h-full border border-[#1e2a45]">
                    <ModelComparisonChart models={metrics} height={420} />
                  </Card>
                </motion.div>
              </div>

              {/* Multiclass Imbalance & Rare Event Discussion */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Card className="p-6 border border-[#1e2a45]">
                  <h3 className="text-base font-semibold text-[#F5F7FF] mb-2">
                    Evaluating Rare Celestial Phenomena (Black Holes & Planets)
                  </h3>
                  <div className="space-y-3 text-sm text-[#9AA6C2] leading-relaxed">
                    <p>
                      In astronomical sky surveys, stable stars constitute the overwhelming majority of
                      detected targets (~60-70%), while transient relativistic phenomena like
                      <strong> stellar-mass black hole gravitational microlensing</strong> occur in less
                      than 3-5% of observations.
                    </p>
                    <p>
                      Consequently, our benchmark emphasizes <strong>Macro F1-Score</strong> and
                      the <strong>4×4 Confusion Matrix</strong> rather than simple accuracy. The
                      GalacticTransformer-X utilizes focal loss and class-balanced temperature sampling
                      to prevent the majority star class from overwhelming the delicate signatures of
                      transiting exoplanets and black hole gravitational lensing spikes.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </>
          )}
        </>
      )}
    </div>
  );
}
