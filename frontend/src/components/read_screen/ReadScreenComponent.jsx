import React, { useState, useEffect } from 'react';
import { readDocument } from '../../services/UserServices';
import IncreaseFontSizeIcon from "@heroicons/react/24/outline/MagnifyingGlassPlusIcon";
import DecreaseFontSizeIcon from "@heroicons/react/24/outline/MagnifyingGlassMinusIcon";
import UploadTextIcon from "@heroicons/react/24/outline/ArrowUpTrayIcon";
import SaveIcon from "@heroicons/react/24/outline/FolderIcon";

function ReadScreenComponent() {
  const textId = localStorage.getItem("textId");
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);

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
            <button
                //onClick={upload}
                data-tip="Decrease font size"
                className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
            >
                <UploadTextIcon className="w-6 h-6" />
            </button>
            <button
                //onClick={Increase}
                data-tip="Decrease font size"
                className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
            >
                <IncreaseFontSizeIcon className="w-6 h-6" />
            </button>
            <button
                //onClick={Decrease}
                data-tip="Decrease font size"
                className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
            >
                <DecreaseFontSizeIcon className="w-6 h-6" />
            </button>
            <button
                //onClick={Save}
                data-tip="Decrease font size"
                className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
            >
                <SaveIcon className="w-6 h-6" />
            </button>
        
          </div>
        </div>

        <div className="flex"> {/* Main content container */}
          
          {/* Reading View Area (Left) */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-6 mr-8 relative min-w-[600px] min-h-[500px] max-h-[600px] overflow-y-auto"> 
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Reading View</h1>
            </div>
            <div className="whitespace-pre-wrap" >
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
