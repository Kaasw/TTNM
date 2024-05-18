import React, { useState } from 'react';
import{ useRef } from "react";
import {useEffect } from "react";
import { createDocument } from '../../services/UserServices';


function ReadHD() {
  const [activeTab, setActiveTab] = useState('addText'); // Default tab
  const [textContent, setTextContent] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleReadNowClick = () => {
    // Add your read now logic here
    console.log('Reading text:', textContent);
    const response = createDocument(textContent, inputFieldValue.current.user_id);
    console.log(response);  
    
    
  }

  const inputFieldValue = useRef({
    content: "",
		user_id: "",
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
            <button className="bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 w-30">
              Add Text 
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleReadNowClick} disabled={!textContent}>
              Read Now
            </button>
          </div>
        )}

        {activeTab === 'uploadFile' && (
          <div>
            {/* Add your file upload logic/UI here */}
            <p>File upload functionality coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadHD;
