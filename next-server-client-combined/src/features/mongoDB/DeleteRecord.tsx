import React, { useState } from "react";

const DeleteRecord = ({ names }: any) => {
  const [user, setUser] = useState("");

  const deleteUser = async () => {
    const res = await fetch("/api/mongoDB/deleteUser", {
      method: "DELETE",
      body: JSON.stringify({ userId: user }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log("Deleted user");
    window.location.reload();
  };

  return (
    <>
      <h2>Delete record</h2>
      <p>Select a user to remove</p>
      <div className="users-delete">
        <select value={user} onChange={(e) => setUser(e.target.value)}>
          <option value="">Select a user</option>
          {Object.values(names).map((name: any) => (
            <option value={name._id} key={name._id}>
              {name.username}
            </option>
          ))}
        </select>
      </div>
      <button onClick={deleteUser} disabled={!user}>
        Delete
      </button>
    </>
  );
};

export default DeleteRecord;
