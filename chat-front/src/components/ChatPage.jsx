import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import TextBox from './TextBox';
import MessageArea from './MessageArea';

const ChatPage = () => {
    const [chats , setChats] =useState(()=>{
        const chats=localStorage.getItem("chatlist");
    if (chats) {
      return JSON.parse(chats);

    } else {
      return [];

    }

    })
    const [sidebarChats,setSidebarChats] =useState(()=>{
      const chats=localStorage.getItem("sidebarchatlist");
  if (chats) {
    return JSON.parse(chats);

  } else {
    return [];

  }

  })
  
  localStorage.setItem("chatlist",JSON.stringify(chats))
  return (
        <>
        <SideBar chats={chats} setChats={setChats} sidebarChats={sidebarChats} setSidebarChats={setSidebarChats}></SideBar>
        <TextBox chats={chats} setChats={setChats} sidebarChats={sidebarChats} setSidebarChats={setSidebarChats}></TextBox>
        <MessageArea chats={chats}></MessageArea>

        </>

  )
}

export default ChatPage