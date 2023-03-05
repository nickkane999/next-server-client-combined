import React, { useEffect, useState } from "react";
import schema from "@/features/mongoDB/data/types/schema.json";
import Info from "@/features/mongoDB/data/types/model2";

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

  const createSchema = async (modelKey: string) => {
    try {
      let newRecord = {};
      if (modelKey === "User") {
        newRecord = {
          username: "test",
          password: "test",
          fname: "test",
          lname: "test2",
          email: "test@gmail.com",
          createdDate: new Date(),
          updatedDate: new Date(),
        };
      } else if (modelKey === "Type") {
        newRecord = {
          type: "EX_1b",
          name: "Medium Content",
          description: "will be used for medium content",
          createdDate: new Date(),
          updatedDate: new Date(),
        };
      }
      const res = await fetch("/api/mongoDB/schema/schema", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelKey, newRecord }),
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
        <button onClick={() => createSchema("User")}>Create User Schema</button>
        <button onClick={() => createSchema("Type")}>Create Type Schema</button>
        <p>{collectionStatus}</p>
        <p>{schemaStatus}</p>
      </div>
    </main>
  );
};

export default CRUD;
