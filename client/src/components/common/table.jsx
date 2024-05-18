/* eslint-disable react/prop-types */
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "src/components";
import { FaPlus } from "react-icons/fa";
const Table = ({ route }) => {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Options",
      selector: (row) => row.options,
    },
  ];

  const data = [
    { id: 1, name: "John Doe", createdAt: "2023-01-01", options: "Edit" },
    { id: 2, name: "Jane Smith", createdAt: "2023-02-01", options: "Edit" },
    { id: 3, name: "Alice Johnson", createdAt: "2023-03-01", options: "Edit" },
    { id: 4, name: "Bob Brown", createdAt: "2023-04-01", options: "Edit" },
    { id: 5, name: "Charlie Davis", createdAt: "2023-05-01", options: "Edit" },
    { id: 6, name: "Diana Evans", createdAt: "2023-06-01", options: "Edit" },
    { id: 7, name: "Eve Foster", createdAt: "2023-07-01", options: "Edit" },
    { id: 8, name: "Frank Green", createdAt: "2023-08-01", options: "Edit" },
    { id: 9, name: "Grace Harris", createdAt: "2023-09-01", options: "Edit" },
    { id: 10, name: "Hank Ives", createdAt: "2023-10-01", options: "Edit" },
    { id: 11, name: "Ivy Johnson", createdAt: "2023-11-01", options: "Edit" },
    { id: 12, name: "Jack King", createdAt: "2023-12-01", options: "Edit" },
  ];

  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (event) => {
    const value = event.target.value;
    setFilterText(value);

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="border-2 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <Button
          text="Add new"
          IcAfter={FaPlus}
          route={route}
          className="bg-main-500 rounded-md py-2 px-3 text-white"
        />
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Name"
            value={filterText}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        className="border-2"
      />
    </div>
  );
};

export default Table;
