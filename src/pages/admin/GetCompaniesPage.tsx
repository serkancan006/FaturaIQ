import { useEffect, useState } from "react";
import GenericTable, { TableColumn } from "../../component/common/GenericTable";
import CompanyService, { CompanyListType } from "../../services/CompanyService";

// id: Number
// name: string
// taxNumber: string
// email: string
// address: string
// phone: string
const companiesColumns: TableColumn[] = [
    {header: "ID", accessor: "id"},
    {header: "Ad", accessor: "name"},
    {header: "Vergi No", accessor: "taxNumber"},
    {header: "Mail", accessor: "email"},
    {header: "Adres", accessor: "address"},
    {header: "İletişim", accessor: "phone"},
]

const GetCompaniesPage = () => {
  const [companies, setCompanies] = useState<CompanyListType[]>([]);

  const fetchData = async () => {
    const response = await CompanyService.getAllCompanies();
    setCompanies(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>GetCompaniesPage</h2>
      <GenericTable data={companies} columns={companiesColumns} />
    </div>
  );
};

export default GetCompaniesPage;
