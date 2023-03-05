import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DisplayRecord from "@/features/mongoDB/crud/DisplayRecord";
import DeleteRecord from "@/features/mongoDB/crud/DeleteRecord";
import CreateRecord from "@/features/mongoDB/crud/CreateRecord";
import UpdateRecord from "@/features/mongoDB/crud/UpdateRecord";

const CRUD = ({ data }: any) => {
  const [names, setNames] = useState<any[]>([]);
  const [schemaStatus, setSchemaStatus] = useState("");
  const [displayVisible, setDisplayVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const { create, display, update, table, model } = data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/mongoDB/crud/read", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ table }),
        });
        const data = await res.json();
        setNames(data.names);
        //console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const addSchema = async () => {
    try {
      const res = await fetch("/api/mongoDB/addSchema", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelKey: model }),
      });
      const result = await res.json();
      if (!result.addedRecords && !result.error) {
        setSchemaStatus("Records already exist in this collection");
      } else if (result.addedRecords && !result.error) {
        setSchemaStatus("Added schema to this collection. Refresh the page to see the sample record.");
      } else if (result.error) {
        setSchemaStatus("Error adding this schema to the collection");
      }
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="container">
        <h1>CRUD: {table}</h1>
        <Button variant="primary" type="button" onClick={addSchema}>
          Initialize Schema
        </Button>
        <div className="status">{schemaStatus}</div>
        <h2>Display sections</h2>
        <div className="tabs">
          <ul>
            <li className={createVisible ? "active" : ""}>
              <div onClick={() => setCreateVisible(!createVisible)}>Create</div>
            </li>
            <li className={displayVisible ? "active" : ""}>
              <div onClick={() => setDisplayVisible(!displayVisible)}>Read</div>
            </li>
            <li className={updateVisible ? "active" : ""}>
              <div onClick={() => setUpdateVisible(!updateVisible)}>Update</div>
            </li>
            <li className={deleteVisible ? "active" : ""}>
              <div onClick={() => setDeleteVisible(!deleteVisible)}>Delete</div>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          {createVisible && <CreateRecord fields={create} table={table} />}
          {displayVisible && <DisplayRecord names={names} fields={display} />}
          {updateVisible && <UpdateRecord names={names} fields={update} table={table} />}
          {deleteVisible && <DeleteRecord names={names} table={table} />}
        </div>
      </div>
    </main>
  );
};

export default CRUD;
