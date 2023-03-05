import React from "react";

const DisplayRecord = ({ names, fields }: any) => {
  return (
    <>
      <h2>Display records</h2>
      <hr />
      {Object.values(names).map((name: any) => (
        <div className="user-info" key={name._id}>
          {fields.map((field: any) => (
            <div className="user-info" key={field.field}>
              <p key={field.field}>
                <b>{field.label}</b>: {name[field.field]}
              </p>
            </div>
          ))}
          <hr />
        </div>
      ))}
    </>
  );
};

export default DisplayRecord;
