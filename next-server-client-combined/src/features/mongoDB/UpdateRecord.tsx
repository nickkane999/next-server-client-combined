import React from "react";

const UpdateRecord = ({ names }: any) => {
  return (
    <>
      <h2>Displaying records</h2>
      <p>Connection is made and will display data below</p>
      {Object.values(names).map((name: any) => (
        <div className="user-info" key={name._id}>
          <p>Username: {name.username}</p>
          <p>First name: {name.fname}</p>
          <p>Last name: {name.lname}</p>
          <p>Email: {name.email}</p>
          <p>Phone: {name.phone}</p>
        </div>
      ))}
    </>
  );
};

export default UpdateRecord;
