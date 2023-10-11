"use client";
import CodeEditor from "@/components/CodeEditor";

import ForumInstructor from "@/components/ForumInstructor";
import { LabContext } from "@/context/LabProvider";
import { LabContextType } from "@/types/LabTypes";
import { Tabs, TabsProps } from "antd";
import Link from "next/link";
import React, { useContext } from "react";

const Session = ({ params }: { params: { session: string } }) => {
  const { labs } = useContext(LabContext) as LabContextType;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Code Editor",
      children: <CodeEditor />,
    },
    {
      key: "2",
      label: "Discussion Forum",
      children: <ForumInstructor labId={params.session} />,
    },
  ];
  return (
    <div>
      <Link href={`/instructor/labs/${params.session}/report`}>
        View Report
      </Link>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Session;
