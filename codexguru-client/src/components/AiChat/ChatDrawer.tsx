import { useContext } from "react";
import { Button, Drawer } from "antd";
import Chat from "./Chat";
import MessageInput from "./MessageInput";
import { RobotOutlined } from "@ant-design/icons";
import IAiChatContext from "@/interfaces/IAiChatContext";
import { AIChatContext } from "@/context/AIChatContext";

const ChatDrawer: React.FC = () => {
    const aiChatCtx = useContext<IAiChatContext | null>(AIChatContext);
    const { isOpen, showDrawer, onClose } = aiChatCtx!;

    return (
        <>
            <div className="w-fit">
                <Drawer title="CODEXGURU" placement="right" onClose={onClose} open={isOpen} width={720}>
                    <div className='h-full grid grid-rows-3 grid-flow-col gap-4'>
                        <div className='row-span-3 h-5/6 chat'>
                            <Chat />
                            <div className='row-start-3 fixed  h-12 w-full mx-auto pt-6 pb-20 bg-white bottom-5 '>
                                <MessageInput />
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
            <div className="h-screen ml-auto w-fit top-0">
                <Button type="primary" onClick={showDrawer} className='h-full' icon={<RobotOutlined />} />
            </div>
        </>
    )
}

export default ChatDrawer;