import React, { useEffect, useState } from "react";
import DisplayRecord from "@/features/mongoDB/DisplayRecord";
import DeleteRecord from "@/features/mongoDB/DeleteRecord";
import CreateRecord from "@/features/mongoDB/CreateRecord";
import UpdateRecord from "@/features/mongoDB/UpdateRecord";

const CRUD = () => {
  const [names, setNames] = useState<any[]>([]);
  const [displayVisible, setDisplayVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/mongoDB/crud/pullUsers");
        const data = await res.json();
        setNames(data.names);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <div className="container">
        <h1>Create, Read, Update, Delete Functionality (CRUD)</h1>
        <h2>Display sections</h2>
        <ul>
          <li>
            <button onClick={() => setCreateVisible(!createVisible)}>Create</button>
          </li>
          <li>
            <button onClick={() => setDisplayVisible(!displayVisible)}>Read</button>
          </li>
          <li>
            <button onClick={() => setUpdateVisible(!updateVisible)}>Update</button>
          </li>
          <li>
            <button onClick={() => setDeleteVisible(!deleteVisible)}>Delete</button>
          </li>
        </ul>
        {displayVisible && <DisplayRecord names={names} />}
        {createVisible && <CreateRecord names={names} />}
        {deleteVisible && <DeleteRecord names={names} />}
        {updateVisible && <UpdateRecord names={names} />}
      </div>
    </main>
  );
};

export default CRUD;
