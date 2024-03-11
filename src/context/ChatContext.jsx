import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, postRequest } from "../components/utils/services.js";
import { useAuth } from "../context/Login.jsx";

export const ChatContext = createContext();

// export const useChat = () => {
//   const [currentChat, setCurrentChat] = useState(null);

//   const updateCurrentChat = (chat) => {
//     setCurrentChat(chat);
//   };

//   return {
//     currentChat,
//     updateCurrentChat,
//   };
// };

export const ChatContextProvider = ({ children }) => {
  // const chatValue = useChat();
  const { user, loading } = useAuth();
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  const useChat = (chat) => {
    setCurrentChat(chat);
    setSelectedChat(chat);
  };

  useEffect(() => {
    console.log("por acaaa");
    if (user && !loading && userChats) {
      getUsers();
    }
  }, [user, loading, userChats]);

  const getUsers = async () => {
    const response = await getRequest(`/chat/${user.userId}`);

    if (response.error) {
      return console.log("errorxxx", response);
    }

    const potentialChats = response.filter((user) => {
      let isChatCreated = false;
      if (user?.userId === user.id) return false;

      if (userChats) {
        isChatCreated = userChats?.some((chat) => {
          return chat.members[0] === user.id || chat.members[1] === user.id;
        });
      }
      return !isChatCreated;
    });

    setPotentialChats(potentialChats);
  };

  useEffect(() => {
    if (user && !loading) {
      getUserChats();
    }
  }, [user]);

  const getUserChats = async () => {
    if (user?.userId) {
      setIsUserChatsLoading(true);
      setUserChatsError(null);

      const response = await getRequest(`/chat/${user.userId}`);
      console.log("useridsdada: ", response);

      setIsUserChatsLoading(false);

      if (response.error) {
        return setUserChatsError(response);
      }

      setUserChats(response);
    }
  };

  useEffect(() => {
    if (selectedChat?._id) {
      getMessages();
    }
  }, [selectedChat]);

  const getMessages = async () => {
    console.log("holaaaa");
    setIsMessagesLoading(true);
    setMessagesError(null);
    try {
      const url = `/messages/${selectedChat?._id}`;
      console.log("Request URL:", url);

      const response = await getRequest(url);

      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }
      setMessages(response);
    } catch (error) {
      console.error("Error in getMessages:", error);
      setIsMessagesLoading(false);
      setMessagesError({ error: true, message: "Failed to fetch messages" });
    }
  };

  const sendTextMessage = async (textMessage, sender, currentChatId) => {
    console.log(
      "dattaaaaa: ",
      textMessage,
      "sender: ",
      sender,
      "currentid: ",
      currentChatId
    );
    console.log(sender);
    if (!textMessage) return console.log("You must type something...");

    try {
      const response = await postRequest(`/messages`, {
        chatId: currentChatId,
        senderId: sender.userId,
        text: [textMessage],
      });
      console.log("resposeeeeee: ", response.text[0]);
      //  if (response.data.error) {
      //     setSendTextMessageError(response.data);
      //     return;
      //  }

      setNewMessage(response.text[0]);
      setMessages((prev) => [...prev, response.text[0]]);
      //  setTextMessage("");
    } catch (error) {
      console.error("Error in sendTextMessage:", error);
      setSendTextMessageError({
        error: true,
        message: "Failed to send text message",
      });
    }
  };

  const updateSelectedChat = useCallback((chat) => {
    setSelectedChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(`chats/`, {
      firstId,
      secondId,
    });

    if (response.error) {
      return console.log("error creating chat", response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateSelectedChat,
        selectedChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        useChat,
        currentChat,
        // chatValue,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
