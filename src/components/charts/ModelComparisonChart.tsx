import Plot from 'react-plotly.js';
import type { ModelMetrics } from '../../types/analysis';

interface ModelComparisonChartProps {
  models: ModelMetrics[];
  height?: number;
  className?: string;
}

export function ModelComparisonChart({
  models,
  height = 380,
  className = '',
}: ModelComparisonChartProps) {
  const names = models.map((m) => m.modelName);

  const metrics: { key: keyof ModelMetrics | string; label: string; color: string }[] = [
    { key: 'macroPrecision', label: 'Macro Precision', color: '#8B83FF' },
    { key: 'macroRecall', label: 'Macro Recall', color: '#63E4E8' },
    { key: 'macroF1', label: 'Macro F1', color: '#E879F9' },
    { key: 'accuracy', label: 'Overall Accuracy', color: '#F59E0B' },
  ];

  return (
    <div className={`w-full ${className}`}>
      <Plot
        data={metrics.map((m) => ({
          x: names,
          y: models.map((mod) => {
            const val = (mod as any)[m.key] ?? (mod as any)[m.key.replace('macro', '').toLowerCase()];
            return typeof val === 'number' ? val : 0;
          }),
          name: m.label,
          type: 'bar' as const,
          marker: { color: m.color, opacity: 0.9 },
          hovertemplate: `<b>${m.label}</b>: %{y:.3f}<extra></extra>`,
        }))}
        layout={{
          title: {
            text: 'Multiclass Model Benchmark Comparison',
            font: { color: '#F5F7FF', size: 14, family: 'Inter, sans-serif' },
            x: 0.02,
            xanchor: 'left',
          },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#9AA6C2', family: 'Inter, sans-serif', size: 11 },
          barmode: 'group',
          xaxis: { color: '#9AA6C2', gridcolor: '#1e2a45' },
          yaxis: {
            title: { text: 'Score [0 – 1.0]', font: { size: 11 } },
            range: [0.7, 1.02],
            gridcolor: '#1e2a45',
            zerolinecolor: '#1e2a45',
            color: '#9AA6C2',
          },
          margin: { l: 50, r: 20, t: 40, b: 60 },
          height,
          legend: {
            orientation: 'h',
            y: -0.25,
            font: { size: 10, color: '#9AA6C2' },
          },
          bargap: 0.25,
          bargroupgap: 0.1,
        }}
        config={{
          responsive: true,
          displaylogo: false,
          displayModeBar: false,
        }}
        useResizeHandler
        style={{ width: '100%' }}
      />
    </div>
  );
}
