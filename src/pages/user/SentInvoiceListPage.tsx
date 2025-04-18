import InvoiceService, { ListInvoiceType } from "../../services/InvoiceService";
import GenericTable, { TableColumn } from "../../component/common/GenericTable";
import { useEffect, useState } from "react";

const invoiceColumns: TableColumn[] = [
  { header: "Fatura No", accessor: "invoiceNumber" },
  {
    header: "Fatura Tarihi",
    accessor: "invoiceDate",
    render: (value: string) => new Date(value).toLocaleDateString("tr-TR"),
  },
  { header: "Durum", accessor: "invoiceStatus" },
  { header: "Toplam Tutar", accessor: "totalAmount" },
  { header: "KDV Tutarı", accessor: "kdvAmount" },
  { header: "KDV Oranı", accessor: "kdvRate" },
  { header: "Net Tutar", accessor: "netAmount" },
  { header: "Tevkifat Oranı", accessor: "withholdingRate" },
  { header: "İskonto Oranı", accessor: "discountRate" },
  { header: "Senaryo Tipi", accessor: "scenarioType" },
  { header: "Fatura Tipi", accessor: "invoiceType" },
  {
    header: "Ürünler",
    accessor: "items",
    render: (_: any, row: ListInvoiceType) =>
      row.items && row.items.length > 0 ? (
        <ul className="list-disc ps-4">
          {row.items.map((item, i) => (
            <>
              <li key={i}>{item.name}</li>
              <li key={i}>{item.description}</li>
              <li key={i}>{item.unitPrice.toString()}</li>
              <li key={i}>{item.quantity.toString()}</li>
              <li key={i}>{item.totalPrice.toString()}</li>
            </>
          ))}
        </ul>
      ) : (
        <span className="text-gray-500">Ürün yok</span>
      ),
  },
  {
    header: "İşlem",
    accessor: "Tıkla",
    render: (_: any, row: ListInvoiceType) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => alert("fatura no: " + row.invoiceNumber)}
        >
          tıkla
        </button>
      </>
    ),
  },
];

const SentInvoiceListPage = () => {
  const [sentInvoices, setSentInvoices] = useState<ListInvoiceType[]>([]);

  const fetchData = async () => {
    try {
      const response = await InvoiceService.getSentInvoices();
      setSentInvoices(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Gönderilen Faturalar Sayfası</h2>
      <GenericTable data={sentInvoices} columns={invoiceColumns} />
    </div>
  )
}

export default SentInvoiceListPage