import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const ChatList = () => {
  const { setChat } = useContext(ChatContext);

  const handleChatClick = (chatId) => {
    setChat(chatId);
  };

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat.id} onClick={() => handleChatClick(chat.id)}>
          {chat.name}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
