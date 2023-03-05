import React, { useEffect, useState } from "react";
import DisplayRecord from "@/features/mongoDB/crud/DisplayRecord";
import DeleteRecord from "@/features/mongoDB/crud/DeleteRecord";
import CreateRecord from "@/features/mongoDB/crud/CreateRecord";
import UpdateRecord from "@/features/mongoDB/crud/UpdateRecord";

const CRUD = ({ data }: any) => {
  const [names, setNames] = useState<any[]>([]);
  const [displayVisible, setDisplayVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const { create, display, update, table } = data;

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

  return (
    <main>
      <div className="container">
        <h1>CRUD: {table}</h1>
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
