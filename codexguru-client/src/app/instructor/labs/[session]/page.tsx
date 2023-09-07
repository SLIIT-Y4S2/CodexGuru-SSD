"use client";
import Forum from "@/components/Forum";
import { LabContext } from "@/store/LabProvider";
import { LabContextType } from "@/types/LabTypes";
import React, { useContext } from "react";

const Session = ({ params }: { params: { session: string } }) => {
  const { labs } = useContext(LabContext) as LabContextType;

  return (
    <div>
      Session {params.session}
      <Forum />
    </div>
  );
};

export default Session;
