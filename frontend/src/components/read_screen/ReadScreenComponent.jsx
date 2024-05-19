import React, { useState, useEffect, useRef } from 'react';
import { readDocument } from '../../services/UserServices';
import { summarize } from '../../services/UserServices';
import IncreaseFontSizeIcon from "@heroicons/react/24/outline/MagnifyingGlassPlusIcon";
import DecreaseFontSizeIcon from "@heroicons/react/24/outline/MagnifyingGlassMinusIcon";
import UploadTextIcon from "@heroicons/react/24/outline/ArrowUpTrayIcon";
import SaveIcon from "@heroicons/react/24/outline/FolderIcon";
import ChevronDownIcon from  '@heroicons/react/24/outline/ChevronDownIcon'
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import { set } from 'react-hook-form';
import { bionicReading } from "bionic-reading";

function ReadScreenComponent() {
  const textId = localStorage.getItem("textId");
  const [isBionicMode, setIsBionicMode] = React.useState(false);
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [summary, setSummary] = useState("");
  const [showSummary, setShowSummary] = useState(false); 
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem(`notes_${textId}`);
    return storedNotes ? JSON.parse(storedNotes) : []; // Lấy mảng ghi chú từ localStorage
  });

  const [newNote, setNewNote] = useState(""); // State cho ghi chú mới
  
  const readingViewRef = useRef(null);

  useEffect(() => {
    const fetchText = async () => {
      const response = await readDocument(textId);
      if (response.status === 200) {
        setText(response.data.content);
        setSummary(response.data.summary);
      }
    };
    localStorage.setItem(`notes_${textId}`, JSON.stringify(notes));
    fetchText();
  }, [textId], [notes, textId]);

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

  const applysummary = async () => {
    const response = await summarize(text);
    console.log(response);
    if (response.status === 200) {
      console.log("Document saved successfully");
      setSummary(response.data.input_text);

    } else {
      console.log("Failed to save document");
    }
    
  }

  const textHighlight = () => {
    const selection = document.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    range.deleteContents();
    const span = document.createElement("span");
    span.style.backgroundColor = "#FBD178";
    span.appendChild(document.createTextNode(selectedText));
    range.insertNode(span);
};

const clearHighlight = () => {
    const selection = document.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    range.deleteContents();
    const span = document.createElement("span");
    span.style.backgroundColor = "transparent";
    span.appendChild(document.createTextNode(selectedText));
    range.insertNode(span);
};

const addHighlightedTextToNotes = () => {
  const selection = window.getSelection();
  if (selection && !selection.isCollapsed) {
    const highlightedText = selection.toString();
    setNotes([...notes, highlightedText]);
    setNewNote(""); // Xóa nội dung input sau khi thêm

    // Xóa highlight sau khi thêm vào ghi chú (tùy chọn)
    if (selection.removeAllRanges) {
      selection.removeAllRanges();
    }
  }
};

const handleNoteChange = (event) => {
  setNewNote(event.target.value);
};

const addNote = () => {
  if (newNote.trim() !== "") { // Kiểm tra ghi chú không rỗng
    setNotes([...notes, newNote]);
    setNewNote(""); // Xóa nội dung input sau khi thêm
  }
};

const deleteNote = (index) => {
  const updatedNotes = [...notes];
  updatedNotes.splice(index, 1);
  setNotes(updatedNotes);
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
                onClick={textHighlight}
            >
                <SaveIcon className="w-6 h-6" />
            </button>
            <button
                //onClick={Summary}
                data-tip="Decrease font size"
                className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
                onClick={clearHighlight}
            >
                <SaveIcon className="w-6 h-6" />
            </button>
        
            <button
                onClick={() => setIsBionicMode(!isBionicMode)}
                className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
              >
                {isBionicMode ? "Normal Mode" : "Bionic Mode"}
            </button>
            <button
                onClick={addHighlightedTextToNotes}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
              >
                Add to note
            </button> {/* Nút thêm ghi chú */}

          </div>
        </div>

        <div className="flex"> {/* Main content container */}
          
          {/* Reading View Area (Left) */}
          <div
            ref={readingViewRef} 
            className={`flex-1 bg-white shadow-md rounded-lg p-6 mr-8 relative min-w-[600px] min-h-[500px] max-h-[600px] overflow-y-auto` } style={{ fontSize: `${fontSize}px` }}> 

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
          <div className="mb-4 p-4 bg-white rounded-lg shadow relative">
              <button 
                onClick={() => setShowSummary(!showSummary)}
                className="absolute top-2 right-2 bg-gray-200 p-1 rounded-full hover:bg-gray-300 focus:outline-none"
              >
                <ChevronDownIcon className={`w-5 h-5 transform transition ${showSummary ? 'rotate-180' : ''}`} />
              </button>
              <h2 className="text-lg font-semibold mb-2">Summary</h2>
              {showSummary && <div>{summary}</div>} {/* Hiển thị có điều kiện phần tóm tắt */}
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Notes</h2>
          <div className="h-32 p-2 border rounded-md resize-none overflow-y-auto mb-2">
            {notes.map((note, index) => (
              <div key={index} className="mb-2 flex items-center">
                <span>{note}</span>
                <button onClick={() => deleteNote(index)} className="text-red-500 ml-2">
                  <TrashIcon className="w-5 h-5" /> {/* Icon xóa */}
                </button>
              </div>
            ))}
          </div>
          <textarea
            value={newNote}
            onChange={handleNoteChange}
            className="w-full p-2 border rounded-md resize-none"
            placeholder="Add new note ..."
          />
          <button 
            onClick={addNote}
            //className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center focus:outline-none"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" /> {/* Icon thêm */}
            
          </button>
        </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ReadScreenComponent;
