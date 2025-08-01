import type { ReactNode } from "react";

interface TableProps {
  headerRows: string[];
  data: Array<ReactNode[]>;
}

export default function Table({ headerRows, data }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-emerald-600 text-white uppercase text-xs font-semibold">
          <tr>
            {headerRows.map((header, i) => (
              <th key={i} className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="even:bg-cream hover:bg-emerald-50 transition">
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
