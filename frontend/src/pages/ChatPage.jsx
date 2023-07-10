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
    <div className="flex flex-col md:flex-row w-screen h-[calc(100vh-60px)]">
      <div className="w-[500px] bg-gray-100">
        <Chatlist chatID={chatID}/>
      </div>
      <div className="w-full bg-gray-200">
        <Chatscreen/>
      </div>
    </div>
  );
}