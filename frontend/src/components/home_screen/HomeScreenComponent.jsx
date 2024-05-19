import React, { useState } from 'react';
import{ useRef } from "react";
import {useEffect } from "react";
import pdfToText from 'react-pdftotext';
import { createDocument } from '../../services/UserServices';


function HomeScreenComponent() {
  const [activeTab, setActiveTab] = useState('addText'); // Default tab
  const [textContent, setTextContent] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const summary = "";

  // ... (other functions: handleTabClick, handleReadNowClick) ...

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    setUploadedFileName(file.name); // Update filename in state
  };

  const handleReadNowClickAtTab = async () => {
    if (!uploadedFile) {
      alert("Please upload a PDF file first.");
      return;
    }

    try {
      const text = await pdfToText(uploadedFile);
      const response = await createDocument(text, inputFieldValue.current.user_id, summary);
      console.log(response);
      localStorage.setItem("textId", response.data.id);
      // history.push('/read'); // Navigate to the reading screen after successful upload
    } catch (error) {
      console.error("Error extracting text from PDF or creating document:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleReadNowClick = async () => {
    const response = await createDocument(textContent, inputFieldValue.current.user_id, summary);
    console.log(response);

    if (response.status === 200) {

      localStorage.setItem("textId", response.data.id);
    
      

    } else {
 
    }
  };

  const inputFieldValue = useRef({
    content: "",
		user_id: "",
    id: "",
    summary: "",
	});

  useEffect(() => {
		const token = localStorage.getItem("token");
		var decodeToken = {};
		if (token) {
			decodeToken = JSON.parse(atob(token?.split(".")[1]));
		}
		const user_id = decodeToken?.user_id;
		inputFieldValue.current.user_id = user_id;
	}, []);



  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Tabs */}
        <div className="flex mb-4">
          <button
            className={`px-4 py-2 rounded-t-md focus:outline-none ${
              activeTab === 'addText' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleTabClick('addText')}
          >
            Add Text
          </button>
          <button
            className={`px-4 py-2 rounded-t-md focus:outline-none ${
              activeTab === 'uploadFile' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleTabClick('uploadFile')}
          >
            Upload File
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-4">ReadEasy</h1>
        <p className="text-gray-600 mb-6">A reading support helpkit for ADHD users.</p>

        {/* Tab Content (Conditional Rendering) */}
        {activeTab === 'addText' && (
          <div>
            <textarea
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Enter your text here..."
              rows={15}
              cols={40}
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleReadNowClick} disabled={!textContent}>
              Read Now
            </button>
          </div>
        )}

{activeTab === 'uploadFile' && (
          <div>
            <input 
              type="file" 
              accept=".pdf" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }} 
            />
            <div className="flex space-x-3">  {/* Button container */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => fileInputRef.current.click()} 
              >
                Upload File
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleReadNowClickAtTab}
                disabled={!uploadedFile} // Disable if no file is uploaded
              >
                Read Now
              </button>
              
            </div>
            {/* Display uploaded filename */}
            {uploadedFileName && (
              <p className="mt-2 text-gray-600">Uploaded file: {uploadedFileName}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeScreenComponent;
