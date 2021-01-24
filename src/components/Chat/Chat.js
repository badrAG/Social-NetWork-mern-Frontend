import { Avatar } from '@material-ui/core'
import React from 'react'

function Chat() {
    return (
        <div>
        <div className="fixed flex flex-col inset-y-0 mt-14 space-y-2 items-end pr-1 justify-end pb-3 overflow-y-auto right-0 w-16">
        <Avatar className="transform hover:-translate-x-3 shadow-md cursor-pointer"/>
        <Avatar className="transform hover:-translate-x-3 shadow-md cursor-pointer"/>
        <Avatar className="transform hover:-translate-x-3 shadow-md cursor-pointer"/>
        <Avatar className="transform hover:-translate-x-3 shadow-md cursor-pointer"/>
        <Avatar className="transform hover:-translate-x-3 shadow-md cursor-pointer"/>
        <Avatar className="transform hover:-translate-x-3 shadow-md cursor-pointer"/>
        <Avatar className="transform hover:-translate-x-3 shadow-md cursor-pointer"/>
        <Avatar className="transform hover:-translate-x-3 shadow-md cursor-pointer"/>
        </div>
        <div className="fixed flex flex-col bottom-0 right-16 w-64 h-96 ">
            <div className="flex items-center justify-between py-2 px-3 rounded-t-xl bg-green-600">
                <div className="flex items-center space-x-2">
                    <Avatar style={{width:"30px",height:"30px"}}/>
                   <span className="font-normal text-sm text-white">UserName</span> 
                </div>
                <span className="font-normal text-sm text-white">X</span>
            </div>
            <div className="flex-1 dark:bg-gray-700 bg-gray-200 overflow-y-auto overflow-x-hidden">

            </div>
            <div className=" px-2 dark:bg-gray-700 border-t-2 border-gray-500 py-1">
                <input placeholder="Message..." className="w-full bg-gray-100 dark:bg-gray-500 h-7 px-2 rounded-3xl outline-none dark:text-white font-normal text-base" type="text"/>
            </div>
        </div>
        </div>
    )
}

export default Chat
