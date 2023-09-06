import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import MessageInput from './MessageInput';
import AIChatContextProvider from '@/context/AIChatContext';
import Chat from './Chat';

const AiChatBot: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AIChatContextProvider>
                <Button type="primary" onClick={showDrawer} className='h-96'>
                    Open
                </Button>
                <Drawer title="CODEXGURU" placement="right" onClose={onClose} open={open} width={720}>
                    <div className='h-full grid grid-rows-3 grid-flow-col gap-4'>
                        <div className='row-span-3'>
                            <Chat />
                            <div className='row-start-3 fixed bottom-28 w-fit mx-auto'>
                                <MessageInput />
                            </div>
                        </div>
                    </div>
                </Drawer>
            </AIChatContextProvider>
        </>
    );
};

export default AiChatBot;