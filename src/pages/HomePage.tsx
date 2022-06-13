import React, { memo, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import Table from "../components/Table";
import { useFetch } from "../hooks/useFetch";

const HomePage = () => {
  // const [users, setUsers] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [blockSubmissionStarted, setBlockSubmissionStarted] = useState(false);
  const navigate = useNavigate();
  const columns = useMemo(
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

  const onBlockUnblockHandler = async () => {
    if (!blockSubmissionStarted) {
      setBlockSubmissionStarted(true);
      try {
        await api.blockUnblockUsers({
          user_id: selectedUsers,
        });
        setSelectedUsers([]);
      } catch (e) {
        console.log(e);
      } finally {
        setBlockSubmissionStarted(false);
      }
    }
  };
  const { data: users, loading, error } = useFetch(api.getAllUsers);
  console.log(error);
  return (
    <div>
      <div className="d-flex justify-content-between container align-items-center">
        <h1>List of users</h1>
        <Link to="/users/add">
          <button type="button" className="btn btn-primary">
            Add
          </button>
        </Link>
      </div>
      <hr />
      {selectedUsers.length > 0 && (
        <div className="py-1 my-1 d-flex justify-content-around">
          {" "}
          <code>{selectedUsers.length} element(s) selected</code>
          <button
            disabled={blockSubmissionStarted}
            onClick={onBlockUnblockHandler}
            className="btn btn-dark"
          >
            {blockSubmissionStarted
              ? "Submitting..."
              : "   Block/Unblock selected user(s)"}
          </button>
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
