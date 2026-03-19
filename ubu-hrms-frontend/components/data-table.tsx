'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
}

export function DataTable<T>({
  columns,
  data,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              {columns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className="px-6 py-3 text-left text-sm font-semibold text-foreground"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-border hover:bg-secondary/10 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.accessor)}
                    className="px-6 py-3 text-sm text-foreground"
                  >
                    {col.render
                      ? col.render(row[col.accessor], row)
                      : String(row[col.accessor])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-secondary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-secondary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
