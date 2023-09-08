"use client";
import React, { useContext } from "react";
import { LabContext } from "@/context/LabProvider";
import { LabContextType } from "@/types/LabTypes";
const Instructor = () => {
  const { labs } = useContext(LabContext) as LabContextType;
  return (
    <div>
      Instructor Home Page
      {labs.map((lab) => (
        <div key={lab._id}>{lab.labSessionName}</div>
      ))}
    </div>
  );
};

export default Instructor;
