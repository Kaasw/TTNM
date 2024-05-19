import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { readDocument } from '../../services/UserServices';
import { summarize } from '../../services/UserServices';
import IncreaseFontSizeIcon from "@heroicons/react/24/outline/MagnifyingGlassPlusIcon";
import DecreaseFontSizeIcon from "@heroicons/react/24/outline/MagnifyingGlassMinusIcon";
import UploadTextIcon from "@heroicons/react/24/outline/ArrowUpTrayIcon";
import PenIcon from "@heroicons/react/24/outline/PencilIcon";
import ChevronDownIcon from  '@heroicons/react/24/outline/ChevronDownIcon'
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import { set } from 'react-hook-form';
import { bionicReading } from "bionic-reading";
import { Tooltip as ReactTooltip } from 'react-tooltip';

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
  const history = useHistory();
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
    span.style.backgroundColor = "#79B4B7";
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
  if (newNote.trim() !== "") { 
    setNotes([...notes, newNote]);
    setNewNote(""); 
  }
};

const deleteNote = (index) => {
  const updatedNotes = [...notes];
  updatedNotes.splice(index, 1);
  setNotes(updatedNotes);
}
const handleNewText = () => {
  history.push('/home');
      window.location.reload();
}
  return (
    <div className="min-h-screen bg-gray-200 p-8 flex justify-center items-center">
      <div className="max-w-5xl mx-auto flex flex-col"> 

        {/* Button List (Top, now on the Left) */}
        <div className="w-full mb-4 mt-8"> 
          <div className="flex space-x-3">  

            <button
                onClick={handleNewText}
                data-tip="New text"
                className="bg-white p-2 rounded-md hover:bg-[#79B4B7] hover:shadow-2xl shadow-lg active:shadow-xl transform hover:-translate-y-1 transition duration-200 active:translate-y-0"
            >
                <UploadTextIcon className="w-6 h-6" />
            </button>
            <button
                //onClick={Increase}
                data-tip="Increase font size"
                className="bg-white p-2 rounded-md hover:bg-[#79B4B7] hover:shadow-2xl shadow-lg active:shadow-xl transform hover:-translate-y-1 transition duration-200 active:translate-y-0"
                onClick={handleZoomIn}
            >
                <IncreaseFontSizeIcon className="w-6 h-6" />
            </button>
            <button
                //onClick={Decrease}
                data-tip="Decrease font size"
                className="bg-white p-2 rounded-md hover:bg-[#79B4B7] hover:shadow-2xl shadow-lg active:shadow-xl transform hover:-translate-y-1 transition duration-200 active:translate-y-0"
                onClick={handleZoomOut}
            >
                <DecreaseFontSizeIcon className="w-6 h-6" />
            </button>
            <button
                //onClick={Summary}
                data-tip="Highlight"
                className="bg-white p-2 rounded-md hover:bg-[#79B4B7] hover:shadow-2xl shadow-lg active:shadow-xl transform hover:-translate-y-1 transition duration-200 active:translate-y-0"
                onClick={textHighlight}
            >
                <PenIcon className="w-6 h-6" />
            </button>
            <button
                //onClick={Summary}
                data-tip="Clear Highlight"
                className="bg-white p-2 rounded-md hover:bg-[#79B4B7] hover:shadow-2xl shadow-lg active:shadow-xl transform hover:-translate-y-1 transition duration-200 active:translate-y-0"
                onClick={clearHighlight}
            >
                <div>
                      <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <path d="M5.50506 11.4096L6.03539 11.9399L5.50506 11.4096ZM3 14.9522H2.25H3ZM9.04776 21V21.75V21ZM11.4096 5.50506L10.8792 4.97473L11.4096 5.50506ZM13.241 17.8444C13.5339 18.1373 14.0088 18.1373 14.3017 17.8444C14.5946 17.5515 14.5946 17.0766 14.3017 16.7837L13.241 17.8444ZM7.21629 9.69832C6.9234 9.40543 6.44852 9.40543 6.15563 9.69832C5.86274 9.99122 5.86274 10.4661 6.15563 10.759L7.21629 9.69832ZM17.9646 12.0601L12.0601 17.9646L13.1208 19.0253L19.0253 13.1208L17.9646 12.0601ZM6.03539 11.9399L11.9399 6.03539L10.8792 4.97473L4.97473 10.8792L6.03539 11.9399ZM6.03539 17.9646C5.18538 17.1146 4.60235 16.5293 4.22253 16.0315C3.85592 15.551 3.75 15.2411 3.75 14.9522H2.25C2.25 15.701 2.56159 16.3274 3.03 16.9414C3.48521 17.538 4.1547 18.2052 4.97473 19.0253L6.03539 17.9646ZM4.97473 10.8792C4.1547 11.6993 3.48521 12.3665 3.03 12.9631C2.56159 13.577 2.25 14.2035 2.25 14.9522H3.75C3.75 14.6633 3.85592 14.3535 4.22253 13.873C4.60235 13.3752 5.18538 12.7899 6.03539 11.9399L4.97473 10.8792ZM12.0601 17.9646C11.2101 18.8146 10.6248 19.3977 10.127 19.7775C9.64651 20.1441 9.33665 20.25 9.04776 20.25V21.75C9.79649 21.75 10.423 21.4384 11.0369 20.97C11.6335 20.5148 12.3008 19.8453 13.1208 19.0253L12.0601 17.9646ZM4.97473 19.0253C5.79476 19.8453 6.46201 20.5148 7.05863 20.97C7.67256 21.4384 8.29902 21.75 9.04776 21.75V20.25C8.75886 20.25 8.449 20.1441 7.9685 19.7775C7.47069 19.3977 6.88541 18.8146 6.03539 17.9646L4.97473 19.0253ZM17.9646 6.03539C18.8146 6.88541 19.3977 7.47069 19.7775 7.9685C20.1441 8.449 20.25 8.75886 20.25 9.04776H21.75C21.75 8.29902 21.4384 7.67256 20.97 7.05863C20.5148 6.46201 19.8453 5.79476 19.0253 4.97473L17.9646 6.03539ZM19.0253 13.1208C19.8453 12.3008 20.5148 11.6335 20.97 11.0369C21.4384 10.423 21.75 9.79649 21.75 9.04776H20.25C20.25 9.33665 20.1441 9.64651 19.7775 10.127C19.3977 10.6248 18.8146 11.2101 17.9646 12.0601L19.0253 13.1208ZM19.0253 4.97473C18.2052 4.1547 17.538 3.48521 16.9414 3.03C16.3274 2.56159 15.701 2.25 14.9522 2.25V3.75C15.2411 3.75 15.551 3.85592 16.0315 4.22253C16.5293 4.60235 17.1146 5.18538 17.9646 6.03539L19.0253 4.97473ZM11.9399 6.03539C12.7899 5.18538 13.3752 4.60235 13.873 4.22253C14.3535 3.85592 14.6633 3.75 14.9522 3.75V2.25C14.2035 2.25 13.577 2.56159 12.9631 3.03C12.3665 3.48521 11.6993 4.1547 10.8792 4.97473L11.9399 6.03539ZM14.3017 16.7837L7.21629 9.69832L6.15563 10.759L13.241 17.8444L14.3017 16.7837Z" />
                      </svg>
                  </div>
            </button>
        
            <button
                data-tip="Bionic mode"
                onClick={() => setIsBionicMode(!isBionicMode)}
                className="bg-white p-2 rounded-md hover:bg-[#79B4B7] font-bold hover:shadow-2xl shadow-lg active:shadow-xl transform hover:-translate-y-1 transition duration-200 active:translate-y-0"
              >
                {isBionicMode ? "Normal Mode" : "Bionic Mode"}
            </button>
            <button
                data-tip="add to note"
                onClick={addHighlightedTextToNotes}
                className="bg-white p-2 rounded-md hover:bg-[#79B4B7] font-bold hover:shadow-2xl shadow-lg active:shadow-xl transform hover:-translate-y-1 transition duration-200 active:translate-y-0"
              >
                Add to note
            </button> {/* Nút thêm ghi chú */}

          </div>
        </div>
        <ReactTooltip />

        <div className="flex"> {/* Main content container */}
          
          {/* Reading View Area (Left) */}
          <div
            ref={readingViewRef} 
            className={`flex-1 bg-white shadow-md rounded-lg p-6 mr-8 relative min-w-[600px] min-h-[500px] max-h-[600px] overflow-y-auto` } style={{ fontSize: `${fontSize}px` }}> 

            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Reading</h1>
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
                className="absolute top-2 right-2 bg-gray-200 p-1 rounded-full hover:bg-[#79B4B7] focus:outline-none"
              >
                <ChevronDownIcon className={`w-5 h-5 transform transition ${showSummary ? 'rotate-180' : ''}`} />
              </button>
              <h2 className="text-lg font-bold mb-2">Summary</h2>
              {showSummary && <div>{summary}</div>} {/* Hiển thị có điều kiện phần tóm tắt */}
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">Notes</h2>
          <div className="h-32 p-2 border rounded-md resize-none overflow-y-auto mb-2 bg-gray-200">
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
            className="w-full p-2 border rounded-md resize-none bg-gray-200 placeholder-black"
            placeholder="Add new note ..."
          />
          <button 
            onClick={addNote}
            //className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-[#99A799] flex items-center focus:outline-none"
          >
            <PlusCircleIcon className="w-5 h-5 hover:bg-[#79B4B7] mr-2 bg-#BC4B51" /> {/* Icon thêm */}
            
          </button>
        </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ReadScreenComponent;
