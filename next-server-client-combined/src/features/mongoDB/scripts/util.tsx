import React, { useState, useEffect } from "react";

const getDirectories = async (filePath: string) => {
  const res = await fetch("/api/mongoDB/scripts/util/getDirectories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filePath }),
  });
  const data = await res.json();
  return data;
};
const getFiles = async (filePath: string, directory: string) => {
  const res = await fetch("/api/mongoDB/scripts/util/getFiles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filePath: filePath + "/" + directory }),
  });
  const data = await res.json();
  return data;
};

export { getDirectories, getFiles };
