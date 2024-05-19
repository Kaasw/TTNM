import React, { useState, useEffect } from 'react';
import { readDocument } from '../../services/UserServices';
import { summarize } from '../../services/UserServices';
import IncreaseFontSizeIcon from "@heroicons/react/24/outline/MagnifyingGlassPlusIcon";
import DecreaseFontSizeIcon from "@heroicons/react/24/outline/MagnifyingGlassMinusIcon";
import UploadTextIcon from "@heroicons/react/24/outline/ArrowUpTrayIcon";
import SaveIcon from "@heroicons/react/24/outline/FolderIcon";
import { set } from 'react-hook-form';
import { bionicReading } from "bionic-reading";

function ReadScreenComponent() {
  const textId = localStorage.getItem("textId");
  const [isBionicMode, setIsBionicMode] = React.useState(false);
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [summary, setSummary] = useState("");


  useEffect(() => {
    const fetchText = async () => {
      const response = await readDocument(textId);
      if (response.status === 200) {
        setText(response.data.content);
        setSummary(response.data.summary);
      }
    };
    fetchText();
  }, [textId]);

  const handleZoomIn = () => {
    setFontSize(prevSize => Math.min(prevSize + 2, 32)); // Max font size 32px
  };

  const handleZoomOut = () => {
    setFontSize(prevSize => Math.max(prevSize - 2, 12)); // Min font size 12px
  };

  const applyBionicReading = (text) => {
    return bionicReading(text, {
      highlightTag: "strong",
  })
  };

  const saveDocument = async () => {
    const response = await summarize(text);
    console.log(response);
    if (response.status === 200) {
      console.log("Document saved successfully");
      setSummary(response.data.input_text);

    } else {
      console.log("Failed to save document");
    }
    
  }


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
                onClick={handleZoomIn}
            >
                <IncreaseFontSizeIcon className="w-6 h-6" />
            </button>
            <button
                //onClick={Decrease}
                data-tip="Decrease font size"
                className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
                onClick={handleZoomOut}
            >
                <DecreaseFontSizeIcon className="w-6 h-6" />
            </button>
            <button
                //onClick={Summary}
                data-tip="Decrease font size"
                className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
                onClick={saveDocument}
            >
                <SaveIcon className="w-6 h-6" />
            </button>
        
            <button
                onClick={() => setIsBionicMode(!isBionicMode)}
                className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
              >
                {isBionicMode ? "Normal Mode" : "Bionic Mode"}
            </button>
        

          </div>
        </div>

        <div className="flex"> {/* Main content container */}
          
          {/* Reading View Area (Left) */}

          <div className={`flex-1 bg-white shadow-md rounded-lg p-6 mr-8 relative min-w-[600px] min-h-[500px] max-h-[600px] overflow-y-auto` } style={{ fontSize: `${fontSize}px` }}> 

            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Reading View</h1>
            </div>
            <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
              __html: isBionicMode ? applyBionicReading(text) : text
          }}>
            
          </div>
          </div>

          {/* Sidebar (Summary/Notes - Right) */}
          <div className="w-96"> 
            <div className="mb-4 p-4 bg-white rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Summary</h2>
              {/* ... content for the Summary section ... */}
              {summary}

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
