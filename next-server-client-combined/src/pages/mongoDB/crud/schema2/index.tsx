import React, { useEffect, useState } from "react";
import schema from "@/features/mongoDB/data/types/schema.json";

const CRUD = () => {
  const [collectionStatus, setCollectionStatus] = useState("");
  const [schemaStatus, setSchemaStatus] = useState("");

  const collection = async () => {
    try {
      const res = await fetch("/api/mongoDB/schema/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schema, collectionName: "types" }),
      });
      const data = await res.json();
      setCollectionStatus(data.message);
    } catch (error) {
      console.error(error);
      setCollectionStatus("Error creating collection.");
    }
  };

  const createSchema = async () => {
    try {
      const newRecord = {
        type: "EX_1a",
        name: "Small Content",
        description: "will be used for small content",
        createdDate: new Date(),
        updatedDate: new Date(),
      };
      const res = await fetch("/api/setType", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newRecord }),
      });
      setSchemaStatus("Schema created successfully.");
    } catch (error) {
      console.error(error);
      setSchemaStatus("Error creating schema.");
    }
  };

  return (
    <main>
      <div className="container">
        <h1>Test</h1>
        <button onClick={() => collection()}>Make Collection</button>
        <button onClick={() => createSchema()}>Create Schema</button>
        <p>{collectionStatus}</p>
        <p>{schemaStatus}</p>
      </div>
    </main>
  );
};

export default CRUD;
