import React, { useEffect, useRef } from 'react';

const MessageArea = ({ chats }) => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when chats are updated
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats]);

  const messageAreaStyle = {
    flex: 1,
    padding: '20px 20px 100px 20px', // Adjust padding to include bottom space
    backgroundColor: '#CF9FFF',
    color: 'white',
    overflowY: 'auto',
    height: 'calc(100vh - 40px)',
    display: 'flex',
    flexDirection: 'column', // Reverse the order of items
   
  };

  const messageStyle = {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '60%', // Limit the width of each message box
    display: 'inline-block',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  };

  const leftChatStyle = {
    ...messageStyle,
    backgroundColor: '#FFD700', // Yellow background for left-side chats
    color: '#000000',
    alignSelf: 'flex-start', // Align to the left
    marginLeft: '300px', // Margin from the left side of the screen
  };

  const rightChatStyle = {
    ...messageStyle,
    backgroundColor: '#ffffff', // White background for right-side chats
    color: '#000000',
    alignSelf: 'flex-end', // Align to the right
    marginRight: '0px', // No margin from the right side of the screen
  };

  return (
    <div style={messageAreaStyle}>
      {/* Render chat messages alternately on left and right */}
      {chats.slice().reverse().map((chat, index) => (
        <div
          key={`chat-${index}`}
          style={index % 2 === 0 ? leftChatStyle : rightChatStyle}
        >
          {chat}
        </div>
      ))}
      {/* Invisible div to trigger scrolling */}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageArea;
