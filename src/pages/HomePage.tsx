import React, { memo, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import Table from "../components/Table";

const HomePage = () => {
  const [users, setUsers] = useState(null);
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
        const { data } = await api.blockUnblockUsers({
          user_id: selectedUsers,
        });
        console.log(data);
        setSelectedUsers([]);
      } catch (e) {
        console.log(e);
      } finally {
        setBlockSubmissionStarted(false);
      }
    }
  };

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
      {users ? (
        <Table
          selectedRows={selectedUsers}
          onCheck={onCheckHandler}
          onClick={(id: number | string) => navigate("/users/" + id)}
          columns={columns}
          data={users}
        />
      ) : (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default memo(HomePage);
