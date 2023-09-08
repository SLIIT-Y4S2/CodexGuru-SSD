"use client";
import { LabContext } from "@/context/LabProvider";
import { LabContextType } from "@/types/LabTypes";
import Link from "next/link";
import React, { useContext } from "react";

const LabsHorizontalView = () => {
  const { labs } = useContext(LabContext) as LabContextType;

  return (
    <div className="my-4">
      <h3 className="text-2xl font-bold">Labs</h3>
      <div className="flex flex-row gap-4 overflow-auto w-max ">
        {labs.map((lab) => (
          <Link href={`/labs/${lab._id}`} key={lab._id}>
            <div className="flex flex-col justify-center items-center w-40 h-40 border-2 border-gray-300 rounded-md shadow-md  hover:bg-gray-100">
              {lab.labSessionName}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LabsHorizontalView;
