import React, { memo, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Column } from "react-table";
import { api } from "../api";
import Table from "../components/Table";
import { useFetch } from "../hooks/useFetch";

const HomePage = () => {
  // const [users, setUsers] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [blockSubmissionStarted, setBlockSubmissionStarted] = useState(false);
  const [serverErrors, setServerErrors] = useState<any>({});
  const navigate = useNavigate();
  const columns: Column<{
    Header: string;
    columns: { Header: string; accessor: string }[];
  }>[] = useMemo(
    () => [
      {
        Header: "Personal info",
        columns: [
          { Header: "Id", accessor: "id" },
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
          { Header: "Blocked", accessor: "blocked_at" },
          { Header: "Group name", accessor: "group_name" },
          { Header: "Number", accessor: "number" },
        ],
      },
    ],
    []
  );

  const onCheckHandler = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, id]);
    } else {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    }
  };

  const onBlockUnblockHandler = async (block: boolean) => {
    if (!blockSubmissionStarted) {
      setBlockSubmissionStarted(true);
      try {
        if (block) {
          await api.blockUsers({
            user_id: selectedUsers,
          });
        } else {
          await api.unblockUsers({
            user_id: selectedUsers,
          });
        }
        setSelectedUsers([]);
      } catch (e: any) {
        setServerErrors(e.response.data);
      } finally {
        setBlockSubmissionStarted(false);
      }
    }
  };

  const { data: users, loading, error } = useFetch(api.getAllUsers);
  return (
    <div>
      <div className="d-flex justify-content-between container align-items-center">
        <h1>List of users</h1>
      </div>
      <hr />
      {(serverErrors.error ||
        serverErrors.error_description ||
        serverErrors.message) && (
        <div className="alert alert-danger" role="alert">
          {serverErrors.error}
          {serverErrors.error_description}
          {serverErrors.message}
        </div>
      )}
      {selectedUsers.length > 0 && (
        <div className="py-1 my-1 d-flex justify-content-around">
          {" "}
          <code>{selectedUsers.length} element(s) selected</code>
          <div>
            <button
              disabled={blockSubmissionStarted}
              onClick={() => onBlockUnblockHandler(true)}
              className="btn btn-dark"
            >
              {blockSubmissionStarted
                ? "Submitting..."
                : "   Block selected user(s)"}
            </button>
            <button
              disabled={blockSubmissionStarted}
              onClick={() => onBlockUnblockHandler(false)}
              className="btn btn-dark mx-2"
            >
              {blockSubmissionStarted
                ? "Submitting..."
                : "   Unblock selected user(s)"}
            </button>
          </div>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.response.data.message ||
            error.message ||
            "Something went wrong"}
        </div>
      )}
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {users && (
        <Table
          selectedRows={selectedUsers}
          onCheck={onCheckHandler}
          onClick={(id: number | string) => navigate("/users/" + id)}
          columns={columns}
          data={users.data}
        />
      )}
    </div>
  );
};

export default memo(HomePage);
