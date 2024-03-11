import { Container, Stack } from "@mui/material";
import { useContext } from "react";
import ChatBox from "../../components/Chat/ChatBox";
import PotentialChats from "../../components/Chat/PotentialChats";
import UserChat from "../../components/Chat/UserChat";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/Login";
import "./Chat.css";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, useChat, currentChat } =
    useContext(ChatContext);

  return (
    <Container>
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => useChat(chat)}>
                  <button onClick={() => console.log(currentChat)}>
                    check
                  </button>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
