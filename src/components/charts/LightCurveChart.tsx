import Plot from 'react-plotly.js';
import type { LightCurvePoint } from '../../types/analysis';

interface LightCurveChartProps {
  points: LightCurvePoint[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  height?: number;
  showRangeslider?: boolean;
  highlightDips?: boolean;
  className?: string;
}

export function LightCurveChart({
  points,
  title = 'Stellar Light Curve',
  xLabel = 'Observation Index',
  yLabel = 'Relative Flux',
  height = 400,
  showRangeslider = false,
  className = '',
}: LightCurveChartProps) {
  const x = points.map((p) => p.index);
  const y = points.map((p) => p.flux);

  return (
    <div className={`w-full ${className}`}>
      <Plot
        data={[
          {
            x,
            y,
            type: 'scatter',
            mode: 'lines',
            line: {
              color: '#8B83FF',
              width: 1.5,
              shape: 'spline',
            },
            hovertemplate:
              'Index: %{x}<br>Flux: %{y:.6f}<extra></extra>',
            name: 'Flux',
          },
        ]}
        layout={{
          title: {
            text: title,
            font: { color: '#F5F7FF', size: 14, family: 'Inter, sans-serif' },
            x: 0.02,
            xanchor: 'left',
          },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#9AA6C2', family: 'Inter, sans-serif', size: 11 },
          xaxis: {
            title: { text: xLabel, font: { size: 11 } },
            gridcolor: '#1e2a45',
            zerolinecolor: '#1e2a45',
            color: '#9AA6C2',
            rangeslider: showRangeslider ? { visible: true } : undefined,
          },
          yaxis: {
            title: { text: yLabel, font: { size: 11 } },
            gridcolor: '#1e2a45',
            zerolinecolor: '#1e2a45',
            color: '#9AA6C2',
          },
          margin: { l: 60, r: 20, t: 40, b: 50 },
          height,
          hovermode: 'x unified',
          dragmode: 'zoom',
          modebar: {
            bgcolor: 'transparent',
            color: '#9AA6C2',
            activecolor: '#8B83FF',
          },
        }}
        config={{
          responsive: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['lasso2d', 'select2d'],
          toImageButtonOptions: {
            format: 'png',
            filename: 'exohunt_lightcurve',
            height: 600,
            width: 1200,
          },
        }}
        useResizeHandler
        style={{ width: '100%' }}
      />
    </div>
  );
}
