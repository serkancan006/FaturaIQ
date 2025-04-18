import React from 'react';

interface TableColumn {
  header: string;  // Sütun başlığı
  accessor: string; // Verinin hangi key'den alınacağını belirten anahtar
  render?: (value: any, row: any) => React.ReactNode; // Veriyi özel şekilde render etmek için opsiyonel fonksiyon
}

interface GenericTableProps {
  data: any[]; // Tablo verisi
  columns: TableColumn[]; // Tablo sütun bilgileri
}

const GenericTable: React.FC<GenericTableProps> = ({ data, columns }) => {
  if (!data || !columns) {
    return <p>No data or columns provided.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? (
                      column.render(row[column.accessor], row) // Render fonksiyonu varsa kullan
                    ) : (
                      row[column.accessor] // Varsayılan olarak veriyi göster
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export type { TableColumn };

export default GenericTable;
