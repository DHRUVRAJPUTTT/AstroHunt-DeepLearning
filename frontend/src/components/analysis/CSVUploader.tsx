import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { CSVValidationResult } from '../../types/analysis';

interface CSVUploaderProps {
  onFileAccepted: (file: File) => void;
  validation: CSVValidationResult;
  isLoading: boolean;
  currentFile: File | null;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function CSVUploader({
  onFileAccepted,
  validation,
  isLoading,
  currentFile,
}: CSVUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
    multiple: false,
    disabled: isLoading,
  });

  const hasFile = currentFile !== null;
  const isValid = validation.status === 'valid';
  const isInvalid = validation.status === 'invalid';

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-300 group
          ${isDragActive
            ? 'border-[#8B83FF] bg-[#8B83FF]/10'
            : isInvalid
            ? 'border-red-500/40 bg-red-500/5 hover:border-red-500/60'
            : isValid
            ? 'border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/60'
            : 'border-[#2a3352] bg-[#121A2E]/50 hover:border-[#8B83FF]/50 hover:bg-[#121A2E]'}
        `}
      >
        <input {...getInputProps()} id="csv-upload-input" aria-label="Upload CSV file" />
        <div className="flex flex-col items-center gap-3">
          <div
            className={`
              p-3 rounded-full transition-colors duration-300
              ${isDragActive
                ? 'bg-[#8B83FF]/20 text-[#8B83FF]'
                : isValid
                ? 'bg-emerald-500/15 text-emerald-400'
                : isInvalid
                ? 'bg-red-500/15 text-red-400'
                : 'bg-[#1e2a45] text-[#9AA6C2] group-hover:text-[#8B83FF]'}
            `}
          >
            {isValid ? (
              <CheckCircle2 size={28} />
            ) : isInvalid ? (
              <AlertCircle size={28} />
            ) : (
              <Upload size={28} />
            )}
          </div>

          {hasFile ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-center">
                <FileSpreadsheet size={16} className="text-[#63E4E8]" />
                <span className="text-sm font-medium text-[#F5F7FF]">
                  {currentFile.name}
                </span>
              </div>
              <p className="text-xs text-[#9AA6C2]">
                {formatFileSize(currentFile.size)}
              </p>
              <p className="text-xs text-[#9AA6C2] mt-1">
                Drop a new file or click to replace
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-medium text-[#F5F7FF]">
                {isDragActive ? 'Drop your CSV file here' : 'Drag and drop a CSV file'}
              </p>
              <p className="text-xs text-[#9AA6C2]">
                or click to browse · .csv files only
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Validation messages */}
      {validation.errors.length > 0 && (
        <div className="space-y-1">
          {validation.errors.map((err, i) => (
            <div key={i} className="flex items-start gap-2 text-red-400 text-xs">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}

      {validation.warnings.length > 0 && (
        <div className="space-y-1">
          {validation.warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-2 text-amber-400 text-xs">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <span>{w}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
