"use client";
import Forum from "@/components/Forum";
import ForumMain from "@/components/Forum/ForumMain";
import { LabContext } from "@/context/LabProvider";
import { LabContextType } from "@/types/LabTypes";
import React, { useContext } from "react";

const Session = ({ params }: { params: { session: string } }) => {
  const { labs } = useContext(LabContext) as LabContextType;

  return (
    <div>
      Session {params.session}
      <ForumMain labId={params.session} />
    </div>
  );
};

export default Session;
