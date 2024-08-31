import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import TextBox from './TextBox';

const ChatPage = () => {
    const [chats , setChats] =useState(()=>{
        const chats=localStorage.getItem("chatlist");
    if (chats) {
      return JSON.parse(chats);

    } else {
      return [];

    }

    })
    localStorage.setItem("chatlist",JSON.stringify(chats))
  return (
        <>
        <SideBar chats={chats} setChats={setChats}></SideBar>
        <TextBox chats={chats} setChats={setChats}></TextBox>

        </>

  )
}

export default ChatPage