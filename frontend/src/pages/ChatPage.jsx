import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chatlist from '../components/Chatlist';
import Chatscreen from '../components/Chatscreen';

export default function ChatPage() {
  const { chatID } = useParams();

  useEffect(() => {
    console.log(chatID);
  })

  return (
    // Main page
    <div className="flex flex-col md:flex-row w-screen h-screen">
      <div className="w-full md:w-1/2 bg-gray-100">
        <Chatlist/>
      </div>
      <div className="w-full md:w-1/2 bg-gray-200">
        <Chatscreen/>
      </div>
    </div>
  );
}