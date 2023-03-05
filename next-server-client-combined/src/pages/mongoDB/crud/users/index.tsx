import React, { useEffect, useState } from "react";
import Section from "@/features/mongoDB/crud/Section";
import data from "@/features/mongoDB/data/users/data";

const CRUD = () => {
  return <Section data={data} />;
};

export default CRUD;
