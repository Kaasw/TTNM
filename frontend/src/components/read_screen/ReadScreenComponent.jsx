import React, { useState, useEffect } from 'react';
import { readDocument } from '../../services/UserServices';


function ReadScreenComponent() {
  const textId = localStorage.getItem("textId");
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchText = async () => {
      const response = await readDocument(textId);
      if (response.status === 200) {
        setText(response.data.content);
      }
    };
    fetchText();
  }, [textId]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="max-w-5xl mx-auto flex flex-col"> 

        {/* Button List (Top, now on the Left) */}
        <div className="w-full mb-8"> 
          <div className="flex space-x-3">  
            <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">Hi</button>
            <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">2</button>
            <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">3</button>
            <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">4</button>
          </div>
        </div>

        <div className="flex"> {/* Main content container */}
          
          {/* Reading View Area (Left) */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-6 mr-8 relative min-w-[600px] min-h-[500px]"> 
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Reading View</h1>
            </div>
            <div className="whitespace-pre-wrap">
              {text}
            </div>
          </div>

          {/* Sidebar (Summary/Notes - Right) */}
          <div className="w-96"> 
            <div className="mb-4 p-4 bg-white rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Summary</h2>
              {/* ... content for the Summary section ... */}
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Notes</h2>
              {/* ... content for the Notes section ... */}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ReadScreenComponent;
