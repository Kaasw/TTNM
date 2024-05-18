import React from 'react';

function ReadScreenComponent() {

    const textId = localStorage.getItem("textId");


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Reading View</h1>

        {/* Display the Text */}
        <div className="whitespace-pre-wrap">
          {textId}
        </div>
      </div>
    </div>
  );
}

export default ReadScreenComponent;
