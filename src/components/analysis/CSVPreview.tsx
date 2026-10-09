import type { CSVMeta } from '../../types/analysis';
import { Card } from '../ui/Card';

interface CSVPreviewProps {
  meta: CSVMeta;
  maxRows?: number;
}

export function CSVPreview({ meta, maxRows = 5 }: CSVPreviewProps) {
  const rows = meta.previewRows.slice(0, maxRows);

  return (
    <Card className="overflow-hidden">
      <div className="px-5 py-3 border-b border-[#1e2a45] flex items-center justify-between">
        <h3 className="text-sm font-medium text-[#F5F7FF]">Data Preview</h3>
        <span className="text-xs text-[#9AA6C2]">
          {meta.rowCount.toLocaleString()} rows × {meta.columnCount.toLocaleString()} columns
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#1e2a45]">
              <th className="px-3 py-2 text-left text-[#9AA6C2] font-medium sticky left-0 bg-[#121A2E]">
                #
              </th>
              {meta.columns.slice(0, 12).map((col, i) => (
                <th
                  key={i}
                  className="px-3 py-2 text-left text-[#9AA6C2] font-medium whitespace-nowrap"
                >
                  {col || `Col ${i}`}
                </th>
              ))}
              {meta.columns.length > 12 && (
                <th className="px-3 py-2 text-left text-[#9AA6C2] font-medium">
                  +{meta.columns.length - 12} more
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-[#1e2a45]/50 hover:bg-[#1a2340]/50 transition-colors"
              >
                <td className="px-3 py-2 text-[#9AA6C2] sticky left-0 bg-[#121A2E]">
                  {rowIdx + 1}
                </td>
                {row.slice(0, 12).map((val, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-3 py-2 text-[#F5F7FF] whitespace-nowrap font-mono"
                  >
                    {val || '—'}
                  </td>
                ))}
                {row.length > 12 && (
                  <td className="px-3 py-2 text-[#9AA6C2]">…</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {meta.rowCount > maxRows && (
        <div className="px-5 py-2 text-xs text-[#9AA6C2] border-t border-[#1e2a45]">
          Showing first {maxRows} of {meta.rowCount.toLocaleString()} rows
        </div>
      )}
    </Card>
  );
}
