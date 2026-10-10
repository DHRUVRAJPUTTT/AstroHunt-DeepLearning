import { useState, useCallback } from 'react';
import Papa from 'papaparse';
import type { CSVMeta, CSVValidationResult } from '../types/analysis';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const ACCEPTED_TYPES = ['.csv', 'text/csv', 'application/vnd.ms-excel'];
const PREVIEW_ROWS = 8;

interface UseCSVUploadReturn {
  file: File | null;
  meta: CSVMeta | null;
  validation: CSVValidationResult;
  isLoading: boolean;
  error: string | null;
  handleFile: (file: File) => void;
  reset: () => void;
}

export function useCSVUpload(): UseCSVUploadReturn {
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<CSVMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<CSVValidationResult>({
    status: 'idle',
    errors: [],
    warnings: [],
  });

  const reset = useCallback(() => {
    setFile(null);
    setMeta(null);
    setIsLoading(false);
    setError(null);
    setValidation({ status: 'idle', errors: [], warnings: [] });
  }, []);

  const handleFile = useCallback((selectedFile: File) => {
    setError(null);
    setMeta(null);
    setValidation({ status: 'validating', errors: [], warnings: [] });
    setIsLoading(true);

    // Basic validations
    const errors: string[] = [];
    const warnings: string[] = [];

    if (selectedFile.size === 0) {
      errors.push('The file is empty.');
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      errors.push(
        `File is too large (${(selectedFile.size / 1024 / 1024).toFixed(1)} MB). Maximum is 50 MB.`
      );
    }

    const ext = selectedFile.name.toLowerCase().split('.').pop();
    if (ext !== 'csv' && !ACCEPTED_TYPES.includes(selectedFile.type)) {
      errors.push('Only CSV files are supported. Please upload a .csv file.');
    }

    if (errors.length > 0) {
      setFile(selectedFile);
      setValidation({ status: 'invalid', errors, warnings });
      setIsLoading(false);
      return;
    }

    // Parse the CSV for preview and metadata
    Papa.parse(selectedFile, {
      preview: PREVIEW_ROWS + 1, // +1 for header
      skipEmptyLines: true,
      complete(results) {
        const data = results.data as string[][];

        if (!data || data.length === 0) {
          setFile(selectedFile);
          setValidation({
            status: 'invalid',
            errors: ['CSV file appears to be empty or could not be parsed.'],
            warnings: [],
          });
          setIsLoading(false);
          return;
        }

        const columns = data[0] || [];
        const previewRows = data.slice(1);

        if (columns.length < 2) {
          warnings.push(
            'The CSV has very few columns. Expected brightness measurements across many observation points.'
          );
        }

        // Count total rows (re-parse just for count)
        Papa.parse(selectedFile, {
          skipEmptyLines: true,
          complete(fullResults) {
            const totalRows = (fullResults.data as string[][]).length - 1; // minus header

            const csvMeta: CSVMeta = {
              fileName: selectedFile.name,
              fileSize: selectedFile.size,
              rowCount: totalRows,
              columnCount: columns.length,
              columns,
              previewRows,
            };

            setFile(selectedFile);
            setMeta(csvMeta);
            setValidation({ status: 'valid', errors: [], warnings, meta: csvMeta });
            setIsLoading(false);
          },
          error(parseError: Error) {
            setFile(selectedFile);
            setValidation({
              status: 'invalid',
              errors: [`CSV parsing error: ${parseError.message}`],
              warnings: [],
            });
            setIsLoading(false);
          },
        });
      },
      error(parseError: Error) {
        setFile(selectedFile);
        setValidation({
          status: 'invalid',
          errors: [`CSV parsing error: ${parseError.message}`],
          warnings: [],
        });
        setIsLoading(false);
      },
    });
  }, []);

  return { file, meta, validation, isLoading, error, handleFile, reset };
}
