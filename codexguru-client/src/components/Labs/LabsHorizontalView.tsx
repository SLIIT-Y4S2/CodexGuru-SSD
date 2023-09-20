"use client";
import { LabContext } from "@/context/LabProvider";
import { LabContextType } from "@/types/LabTypes";
import { Spin } from "antd";
import Link from "next/link";
import React, { useContext } from "react";

const LabsHorizontalView = () => {
  const { labs, loading } = useContext(LabContext) as LabContextType;

  return (
    <div className="my-4">
      <div className="flex flex-between justify-between align-middle mb-4">
        <Link href="/labs">
          <h3 className="text-xl font-semibold">Join a lab session</h3>
        </Link>
        <Link
          href="/labs"
          className="text-blue-600 font-bold text-xl"
          title="All Lab Sessions"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-row gap-4 overflow-auto w-max ">
        {loading && (
          <div>
            <Spin />
          </div>
        )}
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
