"use client";
import CodeEditor from "@/components/CodeEditor";

import ForumInstructor from "@/components/ForumInstructor";
import { LabContext } from "@/context/LabProvider";
import { LabContextType } from "@/types/LabTypes";
import { Tabs, TabsProps } from "antd";
import React, { useContext } from "react";

const Session = ({ params }: { params: { session: string } }) => {
  const { labs } = useContext(LabContext) as LabContextType;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tab 1",
      children: <CodeEditor />,
    },
    {
      key: "2",
      label: "Tab 2",
      children: <ForumInstructor labId={params.session} />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Session;
