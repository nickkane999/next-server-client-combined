import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const UpdateRecord = ({ names }: any) => {
  const [user, setUser] = useState<any>({});

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/mongoDB/crud/updateUser", {
      method: "PUT",
      body: JSON.stringify({ userId: user._id, fname: user.fname, lname: user.lname, username: user.username, email: user.email, phone: user.phone }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log("Updated user");
    window.location.reload();
  };

  const { Group, Label, Control, Select } = Form;
  return (
    <>
      <h2>Update record</h2>
      <p>Select a user to update</p>
      <div className="users-delete">
        <Select
          value={user._id}
          onChange={(e) => {
            const selectedUser = names.find((name: any) => name._id === e.target.value);
            setUser(selectedUser);
          }}
        >
          <option value="">Select a user</option>
          {Object.values(names).map((name: any) => (
            <option value={name._id} key={name._id}>
              {name.username}
            </option>
          ))}
        </Select>
      </div>
      {user._id && (
        <Form onSubmit={handleUpdate}>
          <Group controlId="fname">
            <Label>First name:</Label>
            <Control type="text" name="fname" value={user.fname ? user.fname : ""} onChange={(e) => setUser({ ...user, fname: e.target.value })} />
          </Group>
          <Group controlId="lname">
            <Label>Last name:</Label>
            <Control type="text" name="lname" value={user.lname ? user.lname : ""} onChange={(e) => setUser({ ...user, lname: e.target.value })} />
          </Group>
          <Group controlId="username">
            <Label>Username:</Label>
            <Control type="text" name="username" value={user.username ? user.username : ""} onChange={(e) => setUser({ ...user, username: e.target.value })} />
          </Group>
          <Group controlId="email">
            <Label>Email:</Label>
            <Control type="text" name="email" value={user.email ? user.email : ""} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </Group>
          <Group controlId="phone">
            <Label>Phone:</Label>
            <Control type="text" name="phone" value={user.phone ? user.phone : ""} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
          </Group>
          <Button type="submit">Update User</Button>
        </Form>
      )}
    </>
  );
};

export default UpdateRecord;
