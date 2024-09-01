import React, { useEffect } from 'react';

const SideBar = ({ chats ,sidebarChats}) => {

 

  const sidebarStyle = {
    height: '100vh',
    width: '250px',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    color: 'white',
    paddingTop: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.5)',
  };

  const headingStyle = {
    color: 'purple',       
    textAlign: 'center',    
    marginBottom: '20px',  
  };

  const headingStyle1 = {
    color: 'white',       
    textAlign: 'center',    
    marginBottom: '20px',   
  };

  const listStyle = {
    listStyleType: 'none',   
    padding: 0,             
    margin: 0,
  };

  const listItemStyle = {
    padding: '15px 20px',    
    cursor: 'pointer',     
  };

  const listItemHoverStyle = {
    backgroundColor: '#333',
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={headingStyle}>ChatAI</h2> 
      <h2 style={headingStyle1}>YOUR CHATS</h2> 
      <ul style={listStyle}>
        {sidebarChats.map((chat, index) => (
          <li
            key={index}
            style={listItemStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
          >
            {chat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;