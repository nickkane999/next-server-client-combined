import React, { useEffect, useState } from "react";
import DisplayRecord from "@/features/mongoDB/DisplayRecord";
import DeleteRecord from "@/features/mongoDB/DeleteRecord";
import CreateRecord from "@/features/mongoDB/CreateRecord";
import UpdateRecord from "@/features/mongoDB/UpdateRecord";

const Server = () => {
  const [names, setNames] = useState<any[]>([]);
  const [displayVisible, setDisplayVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/mongoDB/pullUsers");
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
      <h1>Functionality for Next working with MongoDB</h1>
      <h2>View options</h2>
      <ul>
        <li>
          <button onClick={() => setDisplayVisible(!displayVisible)}>Display</button>
        </li>
        <li>
          <button onClick={() => setCreateVisible(!createVisible)}>Create</button>
        </li>
        <li>
          <button onClick={() => setDeleteVisible(!deleteVisible)}>Delete</button>
        </li>
        <li>
          <button onClick={() => setUpdateVisible(!updateVisible)}>Update</button>
        </li>
      </ul>
      {displayVisible && <DisplayRecord names={names} />}
      {createVisible && <CreateRecord names={names} />}
      {deleteVisible && <DeleteRecord names={names} />}
      {updateVisible && <UpdateRecord names={names} />}
    </main>
  );
};

export default Server;
