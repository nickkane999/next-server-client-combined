import React, { useState, useEffect } from "react";
import ScriptSelect from "./ScriptSelect";

const ProcessFile = () => {
  const processFile = async (path: string) => {
    console.log(path);
    return;
    const res = await fetch("/api/mongoDB/crud/scripts/processFile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    });
    const data = await res.json();
    console.log("Processed File");
    window.location.reload();
  };

  return (
    <>
      <ScriptSelect processFile={processFile} />
    </>
  );
};

export default ProcessFile;
