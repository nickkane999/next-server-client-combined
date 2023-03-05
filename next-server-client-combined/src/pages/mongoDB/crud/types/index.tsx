import React, { useEffect, useState } from "react";
import Section from "@/features/mongoDB/crud/Section";
import data from "@/features/mongoDB/data/types/data";

const CRUD = () => {
  return <Section data={data} />;
};

export default CRUD;
