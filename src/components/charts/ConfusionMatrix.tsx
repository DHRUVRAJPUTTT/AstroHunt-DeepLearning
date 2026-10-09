import Plot from 'react-plotly.js';

interface ConfusionMatrixProps {
  /** 4x4 or NxN matrix: matrix[actualIndex][predictedIndex] */
  matrix: number[][];
  modelName?: string;
  labels?: string[];
  height?: number;
  className?: string;
}

const DEFAULT_LABELS = ['Star', 'Exoplanet', 'Black Hole', 'Asteroid'];

export function ConfusionMatrix({
  matrix,
  modelName = 'Galactic Multiclass Model',
  labels = DEFAULT_LABELS,
  height = 420,
  className = '',
}: ConfusionMatrixProps) {
  // Ensure we have a valid matrix
  if (!matrix || matrix.length === 0) {
    return <div className="text-sm text-[#9AA6C2]">No confusion matrix data available.</div>;
  }

  const effectiveLabels = labels.slice(0, matrix.length);
  const n = matrix.length;

  // Plotly Heatmap displays z[row][col] where y=row and x=col.
  // We want y = Actual (from top to bottom), x = Predicted (left to right).
  // In Plotly, if y is given as ['Star', 'Exoplanet', ...], autorange='reversed' keeps top-to-bottom.
  const z: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      row.push(matrix[i]?.[j] ?? 0);
    }
    z.push(row);
  }

  // Calculate total and max for thresholding annotation text colors
  let totalCount = 0;
  let maxVal = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      totalCount += z[i][j];
      if (z[i][j] > maxVal) maxVal = z[i][j];
    }
  }

  const annotations: Array<{
    x: string;
    y: string;
    text: string;
    font: { color: string; size: number; family: string };
    showarrow: boolean;
  }> = [];

  for (let i = 0; i < n; i++) {
    const rowTotal = z[i].reduce((a, b) => a + b, 0);
    for (let j = 0; j < n; j++) {
      const val = z[i][j];
      const pct = rowTotal > 0 ? ((val / rowTotal) * 100).toFixed(1) : '0';
      const isDiagonal = i === j;
      const isHigh = val > maxVal * 0.4;

      annotations.push({
        x: effectiveLabels[j],
        y: effectiveLabels[i],
        text: `<b>${val.toLocaleString()}</b><br><span style="font-size:10px;opacity:0.85">${pct}%</span>`,
        font: {
          color: isHigh ? '#FFFFFF' : isDiagonal ? '#A78BFA' : '#94A3B8',
          size: n <= 2 ? 14 : 12,
          family: 'Inter, sans-serif',
        },
        showarrow: false,
      });
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <Plot
        data={[
          {
            z,
            x: effectiveLabels,
            y: effectiveLabels,
            type: 'heatmap',
            colorscale: [
              [0, '#090D1E'],
              [0.2, '#1E1B4B'],
              [0.5, '#4C1D95'],
              [0.75, '#7C3AED'],
              [1, '#06B6D4'],
            ],
            showscale: true,
            colorbar: {
              tickcolor: '#9AA6C2',
              tickfont: { color: '#9AA6C2', size: 10 },
              len: 0.8,
              thickness: 12,
              outlinewidth: 0,
            },
            hovertemplate:
              'Actual: <b>%{y}</b><br>Predicted: <b>%{x}</b><br>Count: <b>%{z:,}</b><extra></extra>',
          },
        ]}
        layout={{
          title: {
            text: `4×4 Celestial Confusion Matrix — ${modelName}`,
            font: { color: '#F5F7FF', size: 14, family: 'Inter, sans-serif' },
            x: 0.02,
            xanchor: 'left',
          },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#9AA6C2', family: 'Inter, sans-serif', size: 11 },
          xaxis: {
            title: { text: 'Predicted Celestial Class', font: { size: 11 } },
            color: '#9AA6C2',
            side: 'bottom',
            tickangle: 0,
          },
          yaxis: {
            title: { text: 'True / Actual Class', font: { size: 11 } },
            color: '#9AA6C2',
            autorange: 'reversed',
          },
          annotations,
          margin: { l: 110, r: 40, t: 50, b: 70 },
          height,
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
