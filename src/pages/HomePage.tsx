import React, { memo, MouseEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import Table from "../components/Table";

const HomePage = () => {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        Header: "Personal info",
        columns: [
          { Header: "Name", accessor: "name" },
          { Header: "Surname", accessor: "surname" },
          { Header: "Email", accessor: "email" },
          { Header: "Birth Date", accessor: "birth_date" },
          { Header: "Gender", accessor: "gender" },
        ],
      },
      {
        Header: "Other info",
        columns: [
          { Header: "Group name", accessor: "group_name" },
          { Header: "Number", accessor: "number" },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    api
      .getAllUsers()
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>List of users</h1>
      <hr />
      {users ? (
        <Table columns={columns} data={users} />
      ) : (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default memo(HomePage);