import React, { useState } from 'react';

const TextBox = ({ chats, setChats, sidebarChats, setSidebarChats }) => {
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(1);
  const [isUploaded, setIsUploaded] = useState(false);
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
    backgroundColor: isUploaded ? 'gray' : '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
  };

  const sendTextToBackend = async (text) => {
    const tempMessage = "Please wait your query is being processed....";
    setChats((prevChats) => [tempMessage, ...prevChats]);

    try {
      const response = await fetch('http://127.0.0.1:5000/get-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const result = await response.json();
      setChats((prevChats) => {
        const updatedChats = prevChats.filter(chat => chat !== tempMessage);
        return [result.message, ...updatedChats];
      });

    } catch (error) {
      console.error('Error sending text:', error);
      alert('Error sending text');
    }
  };

  const handleSend = () => {
    if (message.trim() === '') return; // Don't send if the message is empty
    setChats((prevChats) => [message, ...prevChats]);
    sendTextToBackend(message);
    setMessage('');
  };

  const handleNewChat = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/delete-uploads', {
        method: 'DELETE',
      });

      if (response.ok) {
        setIsUploaded(false);
        setChats([]);
        setSelectedFile(null);
      } else {
        console.error('Error deleting uploads:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting uploads:', error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (isUploaded) return;

    if (file) {
      setSelectedFile(file);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://127.0.0.1:5000/upload-file', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        const fileName = file.name;
        setSidebarChats((prevChats) => [fileName, ...prevChats]);
        setIsUploaded(true);
        setCount(count + 1);
      } catch (error) {
        console.log('Error uploading file:', error);
      }
    }
  };

  const handleAlert = () => {
    if (isUploaded) {
      alert("Please click on new chat to upload a new file");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
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
        onKeyDown={handleKeyDown} // Listening for the Enter key press
      />
      <button style={buttonStyle} onClick={handleSend}>Send</button>
      <label htmlFor="pdfUpload" style={fileLabelStyle} onMouseEnter={handleAlert}>
        {!isUploaded ? "Upload PDF" : `${selectedFile?.name}`}
      </label>
      <input
        type="file"
        id="pdfUpload"
        style={fileInputStyle}
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={isUploaded}
      />
      <button style={buttonStyle} onClick={handleNewChat}>New Chat</button>
    </div>
  );
};

export default TextBox;
