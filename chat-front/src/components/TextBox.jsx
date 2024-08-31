import React, { useState } from 'react';

const TextBox = ({ chats, setChats }) => {
  const [message, setMessage] = useState('');

  const textBoxContainerStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '250px',
    width: 'calc(100% - 270px)',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle = {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    marginLeft: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const fileInputStyle = {
    display: 'none',
  };

  const fileLabelStyle = {
    marginLeft: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
  };

  const handleSend = () => {

      setChats((prevChats) => [message, ...prevChats]); 

      setMessage('');

  };

  return (
    <div style={textBoxContainerStyle}>
      <input
        type="text"
        style={inputStyle}
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <label htmlFor="pdfUpload" style={fileLabelStyle}>Upload PDF</label>
      <input type="file" id="pdfUpload" style={fileInputStyle} accept="application/pdf" />
      <button style={buttonStyle} onClick={handleSend}>Send</button>
    </div>
  );
};

export default TextBox;