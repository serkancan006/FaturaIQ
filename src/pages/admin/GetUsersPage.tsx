import { useEffect, useState } from "react";
import GenericTable, { TableColumn } from "../../component/common/GenericTable";
import UserService, { UserListType } from "../../services/UserService";

const usersColumns: TableColumn[] = [
  {
    header: "User_Id",
    accessor: "id",
  },
  { header: "Email", accessor: "email" },
  { header: "Ad", accessor: "firstName" },
  { header: "Soyad", accessor: "lastName" },
  {
    header: "Durum",
    accessor: "isActive",
    render: (_: any, row: UserListType) => (
      <>
        {row.isActive ? (
          <span className="badge text-bg-success">
            {row.isActive ? "Aktif" : "Pasif"}
          </span>
        ) : (
          <span className="badge text-bg-danger">
            {row.isActive ? "Aktif" : "Pasif"}
          </span>
        )}
      </>
    ),
  },
  {
    header: "İslemler",
    accessor: "",
    render: (_: any, row: UserListType) => (
      <>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => alert("id = " + row.id)}
        >
          {"=)"}
        </button>
      </>
    ),
  },
];

const GetUsersPage = () => {
  const [users, setUsers] = useState<UserListType[]>([]);

  const fetchData = async () => {
    const response = await UserService.getAllUsers();
    setUsers(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>GetUsersPage</h2>
      <GenericTable data={users} columns={usersColumns} />
    </div>
  );
};

export default GetUsersPage;
