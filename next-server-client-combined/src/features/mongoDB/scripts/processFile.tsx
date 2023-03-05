import React, { useState, useEffect } from "react";
import FileSelect from "./FileSelect";

const ProcessFile = () => {
  const processFile = async (filePath: string) => {
    const res = await fetch("/api/mongoDB/scripts/processFile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filePath }),
    });
    const data = await res.json();
    console.log("Processed File");
    window.location.reload();
  };

  return (
    <>
      <FileSelect processFile={processFile} />
    </>
  );
};

export default ProcessFile;
