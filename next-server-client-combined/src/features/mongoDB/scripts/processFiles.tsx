import React, { useState, useEffect } from "react";
import DirectorySelect from "./DirectorySelect";

const ProcessFile = () => {
  const processFiles = async (filePath: string) => {
    const res = await fetch("/api/mongoDB/scripts/processFiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filePath }),
    });
    const data = await res.json();
    console.log("Processed Files");
    window.location.reload();
  };

  return (
    <>
      <DirectorySelect processFile={processFiles} />
    </>
  );
};

export default ProcessFile;
