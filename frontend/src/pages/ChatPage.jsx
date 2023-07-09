import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ChatPage() {
  const { chatID } = useParams();

  useEffect(() => {
    console.log(chatID);
  })

  return (
    <>
      
    </>
  );
}