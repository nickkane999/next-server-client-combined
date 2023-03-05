import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";

const DeleteRecord = ({ names, table }: any) => {
  const [record, setRecord] = useState("");

  const deleteRecord = async () => {
    const res = await fetch("/api/mongoDB/crud/delete", {
      method: "DELETE",
      body: JSON.stringify({ recordId: record, table }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log("Deleted record");
    window.location.reload();
  };

  const { Group, Label, Control } = Form;
  return (
    <Container>
      <h2>Delete record</h2>
      <p>Select a record to remove</p>
      <Form>
        <Group controlId="record-select">
          <Label>Select a record</Label>
          <Control as="select" value={record} onChange={(e) => setRecord(e.target.value)}>
            <option value="">Select a record</option>
            {Object.values(names).map((name: any) => (
              <option value={name._id} key={name._id}>
                {name.username}
              </option>
            ))}
          </Control>
        </Group>
        <Button variant="danger" onClick={deleteRecord} disabled={!record}>
          Delete
        </Button>
      </Form>
    </Container>
  );
};

export default DeleteRecord;
