import Plot from 'react-plotly.js';

interface ClassDistributionChartProps {
  starCount?: number;
  exoplanetCount?: number;
  blackHoleCount?: number;
  asteroidCount?: number;
  // Optional backward compatibility
  positiveCount?: number;
  negativeCount?: number;
  height?: number;
  className?: string;
}

export function ClassDistributionChart({
  starCount = 7820,
  exoplanetCount = 3410,
  blackHoleCount = 680,
  asteroidCount = 2940,
  positiveCount,
  negativeCount,
  height = 320,
  className = '',
}: ClassDistributionChartProps) {
  // If only 2 counts provided, show 2, otherwise show the 4 celestial classes
  const isBinary = positiveCount !== undefined && negativeCount !== undefined && starCount === 7820;

  const categories = isBinary
    ? ['Non-Transit (0)', 'Transit Candidate (1)']
    : ['Stars', 'Exoplanets', 'Black Holes', 'Asteroids'];

  const values = isBinary
    ? [negativeCount!, positiveCount!]
    : [starCount, exoplanetCount, blackHoleCount, asteroidCount];

  const colors = isBinary
    ? ['#63E4E8', '#8B83FF']
    : ['#F59E0B', '#06B6D4', '#A855F7', '#F97316'];

  return (
    <div className={`w-full ${className}`}>
      <Plot
        data={[
          {
            x: categories,
            y: values,
            type: 'bar',
            marker: {
              color: colors,
              opacity: 0.9,
              line: { width: 1, color: '#2A3352' },
            },
            text: values.map((v) => v.toLocaleString()),
            textposition: 'outside',
            textfont: { color: '#F5F7FF', size: 11 },
            hovertemplate: '<b>%{x}</b><br>Sample Count: %{y:,}<extra></extra>',
          },
        ]}
        layout={{
          title: {
            text: 'Celestial Class Distribution (Survey Dataset)',
            font: { color: '#F5F7FF', size: 14, family: 'Inter, sans-serif' },
            x: 0.02,
            xanchor: 'left',
          },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#9AA6C2', family: 'Inter, sans-serif', size: 11 },
          xaxis: {
            gridcolor: '#1e2a45',
            color: '#9AA6C2',
          },
          yaxis: {
            title: { text: 'Number of Observations', font: { size: 11 } },
            gridcolor: '#1e2a45',
            zerolinecolor: '#1e2a45',
            color: '#9AA6C2',
          },
          margin: { l: 60, r: 20, t: 40, b: 50 },
          height,
          bargap: 0.35,
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
