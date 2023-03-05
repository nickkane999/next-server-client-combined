import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CreateRecord = ({ names }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async () => {
    const res = await fetch("/api/mongoDB/crud/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log("Created user");
    window.location.reload();
  };

  const { Group, Label, Control } = Form;
  return (
    <>
      <h2>Create new user</h2>
      <Form>
        <Group controlId="formBasicUsername">
          <Label>Username:</Label>
          <Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Group>

        <Group controlId="formBasicPassword">
          <Label>Password:</Label>
          <Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Group>

        <Button variant="primary" type="button" onClick={createUser}>
          Create User
        </Button>
      </Form>
    </>
  );
};

export default CreateRecord;
