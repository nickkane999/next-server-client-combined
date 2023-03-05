import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";

const DeleteRecord = ({ names }: any) => {
  const [user, setUser] = useState("");

  const deleteUser = async () => {
    const res = await fetch("/api/mongoDB/crud/deleteUser", {
      method: "DELETE",
      body: JSON.stringify({ userId: user }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log("Deleted user");
    window.location.reload();
  };

  const { Group, Label, Control } = Form;
  return (
    <Container>
      <h2>Delete record</h2>
      <p>Select a user to remove</p>
      <Form>
        <Group controlId="user-select">
          <Label>Select a user</Label>
          <Control as="select" value={user} onChange={(e) => setUser(e.target.value)}>
            <option value="">Select a user</option>
            {Object.values(names).map((name: any) => (
              <option value={name._id} key={name._id}>
                {name.username}
              </option>
            ))}
          </Control>
        </Group>
        <Button variant="danger" onClick={deleteUser} disabled={!user}>
          Delete
        </Button>
      </Form>
    </Container>
  );
};

export default DeleteRecord;
