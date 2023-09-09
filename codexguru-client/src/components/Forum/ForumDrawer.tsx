"use client";
import { CommentOutlined, RobotOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import React from "react";
import ForumMain from "./ForumMain";

const ForumDrawer = ({ labId }: { labId: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="w-fit">
      <Drawer
        title="Q&A Forum"
        placement="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        width={720}
      >
        <ForumMain labId={labId} />
      </Drawer>
      <div className="h-1/2 bottom-0 right-0 absolute">
        {/* <Button
          type="primary"
          onClick={() => setIsOpen(true)}
          className="h-full bg-[#00B2BD] hover:bg-[#00949D]  rounded-none"
          icon={<CommentOutlined />}
        /> */}
        <button
          className="h-full bg-[#00B2BD] hover:bg-[#00949D]  rounded-none w-8"
          onClick={() => setIsOpen(true)}
        >
          <CommentOutlined />
        </button>
      </div>
    </div>
  );
};

export default ForumDrawer;
