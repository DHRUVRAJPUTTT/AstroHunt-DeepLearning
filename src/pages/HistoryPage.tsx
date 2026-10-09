import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { History, Search, Filter } from 'lucide-react';
import { getAnalysisHistory } from '../services/api';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { LoadingState } from '../components/ui/LoadingState';
import { DemoIndicator } from '../components/ui/DemoIndicator';
import type { AnalysisHistoryRecord } from '../types/analysis';

export function HistoryPage() {
  const [history, setHistory] = useState<AnalysisHistoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'BLACK_HOLE' | 'EXOPLANET' | 'STAR' | 'ASTEROID'>('all');

  useEffect(() => {
    async function loadHistory() {
      setIsLoading(true);
      const res = await getAnalysisHistory();
      if (res.success && res.data) {
        setHistory(res.data);
      }
      setIsLoading(false);
    }
    loadHistory();
  }, []);

  const filteredHistory = history.filter((item) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      item.fileName.toLowerCase().includes(searchLower) ||
      (item.targetName && item.targetName.toLowerCase().includes(searchLower)) ||
      item.label.toLowerCase().includes(searchLower);

    const matchesFilter =
      filter === 'all' || item.celestialType === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#F5F7FF] flex items-center gap-2">
            <History size={24} className="text-[#8B83FF]" />
            Deep Space Analysis History
          </h1>
          <p className="text-sm text-[#9AA6C2] mt-1">
            Review past observation classifications across Stars, Exoplanets, Black Holes, and Asteroids.
          </p>
        </div>
        <DemoIndicator />
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <div className="relative flex-1 w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA6C2]"
          />
          <input
            type="text"
            placeholder="Search targets, filenames, or classifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#121A2E] border border-[#2a3352] rounded-lg text-sm text-[#F5F7FF] focus:outline-none focus:ring-2 focus:ring-[#8B83FF] focus:border-transparent transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={18} className="text-[#9AA6C2] shrink-0" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="flex-1 sm:w-56 px-3 py-2 bg-[#121A2E] border border-[#2a3352] rounded-lg text-sm text-[#F5F7FF] focus:outline-none focus:ring-2 focus:ring-[#8B83FF] focus:border-transparent"
          >
            <option value="all">All Celestial Classes</option>
            <option value="BLACK_HOLE">🕳️ Black Holes</option>
            <option value="EXOPLANET">🪐 Exoplanets</option>
            <option value="STAR">🌟 Stars</option>
            <option value="ASTEROID">☄️ Asteroids</option>
          </select>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="overflow-hidden border border-[#1e2a45]">
          {isLoading ? (
            <LoadingState message="Loading historical telescope logs..." size="lg" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#1e2a45] bg-[#101629]">
                    <th className="px-6 py-4 font-medium text-[#9AA6C2]">
                      Target & File Name
                    </th>
                    <th className="px-6 py-4 font-medium text-[#9AA6C2]">
                      Observation Timestamp
                    </th>
                    <th className="px-6 py-4 font-medium text-[#9AA6C2]">
                      Celestial Prediction
                    </th>
                    <th className="px-6 py-4 font-medium text-[#9AA6C2]">
                      Confidence Score
                    </th>
                    <th className="px-6 py-4 font-medium text-[#9AA6C2]">
                      Pipeline Mode
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2a45]/50">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => {
                      const badgeVariant =
                        item.celestialType === 'BLACK_HOLE'
                          ? 'purple'
                          : item.celestialType === 'EXOPLANET'
                          ? 'success'
                          : item.celestialType === 'STAR'
                          ? 'warning'
                          : 'info';

                      const barColor =
                        item.celestialType === 'BLACK_HOLE'
                          ? 'bg-purple-500'
                          : item.celestialType === 'EXOPLANET'
                          ? 'bg-cyan-500'
                          : item.celestialType === 'STAR'
                          ? 'bg-amber-500'
                          : 'bg-orange-500';

                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-[#151f38]/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <p className="font-semibold text-[#F5F7FF]">
                              {item.targetName || item.fileName}
                            </p>
                            <p className="text-xs text-[#9AA6C2]">
                              {item.fileName}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-[#9AA6C2]">
                            {new Date(item.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={badgeVariant}>
                              {item.label}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[#F5F7FF]">
                                {(item.confidence * 100).toFixed(1)}%
                              </span>
                              <div className="w-16 h-1.5 bg-[#1e2a45] rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${barColor}`}
                                  style={{ width: `${item.confidence * 100}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {item.isSimulated ? (
                              <Badge variant="demo" size="sm">
                                Simulated
                              </Badge>
                            ) : (
                              <Badge variant="info" size="sm">
                                Model Inference
                              </Badge>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-[#9AA6C2]"
                      >
                        {search || filter !== 'all'
                          ? 'No observations match your celestial filters.'
                          : 'No analysis history found.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
