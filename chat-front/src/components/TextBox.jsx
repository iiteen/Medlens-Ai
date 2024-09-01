import React, { useState } from 'react';


const TextBox = ({ chats, setChats,sidebarChats,setSidebarChats }) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

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
  const sendTextToBackend = async (text) => {
    try {
      console.log(text)
      const response = await fetch(' http://127.0.0.1:5000/get-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const result = await response.json();
      console.log(result.message);
     

    } catch (error) {
      console.error('Error sending text:', error);
      alert('Error sending text');
    }
  };
  const handleSend = () => {
    setChats((prevChats) => [message, ...prevChats]);
    setSidebarChats((prevChats) => [message, ...prevChats]);
    sendTextToBackend(message)
   

    setMessage("");
  };

  const handleNewChat = () => {
    // Your new chat logic here
  };
  

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const formData = new FormData(); 
      formData.append('file', file);

      try {
        const response = await fetch(' http://127.0.0.1:5000/upload-file', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        console.log(result.message);
        

      } catch (error) {
        console.log('Error uploading file:', error);
       
      }
    }
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
      <button style={buttonStyle} onClick={handleSend}>Send</button>
      <label htmlFor="pdfUpload" style={fileLabelStyle}>Upload PDF</label>
      <input
        type="file"
        id="pdfUpload"
        style={fileInputStyle}
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <button style={buttonStyle} onClick={handleNewChat}>New Chat</button>
    </div>
  );
};

export default TextBox;
