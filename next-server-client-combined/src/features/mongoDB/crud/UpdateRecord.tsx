import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const UpdateRecord = ({ names, fields, table }: any) => {
  const { updateFields, primaryField } = fields;
  const [record, setRecord] = useState<any>({});

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/mongoDB/crud/update", {
      method: "PUT",
      body: JSON.stringify({
        recordId: record._id,
        ...record,
        table,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log("Updated record");
    window.location.reload();
  };

  const { Group, Label, Control, Select } = Form;
  return (
    <>
      <h2>Update record</h2>
      <p>Select a record to update</p>
      <div className="users-delete">
        <Select
          value={record._id}
          onChange={(e) => {
            const selectedRecord = names.find((name: any) => name._id === e.target.value);
            setRecord(selectedRecord);
          }}
        >
          <option value="">Select a record</option>
          {Object.values(names).map((name: any) => (
            <option value={name._id} key={name._id}>
              {name[primaryField]}
            </option>
          ))}
        </Select>
      </div>
      {record._id && (
        <Form onSubmit={handleUpdate}>
          {updateFields.map((field: any) => (
            <Group controlId={field.id} key={field.id}>
              <Label>{field.label}:</Label>
              <Control type={field.type} name={field.name} value={record[field.name] ? record[field.name] : ""} onChange={(e) => setRecord({ ...record, [field.name]: e.target.value })} />
            </Group>
          ))}
          <Button type="submit">Update Record</Button>
        </Form>
      )}
    </>
  );
};

export default UpdateRecord;
