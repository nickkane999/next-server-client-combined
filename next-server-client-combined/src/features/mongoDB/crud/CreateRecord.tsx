import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CreateRecord = ({ fields, table }: any) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createUser = async () => {
    const res = await fetch("/api/mongoDB/crud/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData, fields, table }),
    });
    const data = await res.json();
    console.log("Created record");
    window.location.reload();
  };

  const { Group, Label, Control } = Form;
  return (
    <>
      <h2>Create Record</h2>
      <Form>
        {fields.map((field: any) => (
          <Group controlId={`formBasic${field.name}`} key={field.name}>
            <Label>{field.name}:</Label>
            <Control type={field.type} placeholder={`Enter ${field.name}`} name={field.name} onChange={handleInputChange} />
          </Group>
        ))}
        <Button variant="primary" type="button" onClick={createUser}>
          Create Record
        </Button>
      </Form>
    </>
  );
};

export default CreateRecord;
