import React, { useState } from "react";

const CreateRecord = ({ names }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async () => {
    const res = await fetch("/api/mongoDB/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log("Created user");
    window.location.reload();
  };

  return (
    <>
      <h2>Create new user</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={createUser}>
          Create User
        </button>
      </form>
    </>
  );
};

export default CreateRecord;
