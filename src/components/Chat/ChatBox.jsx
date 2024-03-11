import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/material";
import React, { useContext, useState } from "react";
import InputEmoji from "react-input-emoji";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/Login";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");

  if (!recipientUser || !currentChat) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet...
      </p>
    );
  }

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {isMessagesLoading && <p>Loading messages...</p>}
        {!isMessagesLoading && messages && messages.length === 0 && (
          <p>No messages in this chat yet.</p>
        )}
        {!isMessagesLoading &&
          messages &&
          messages.map((message, index) => (
            <Stack
              key={index}
              className={`message ${
                message?.senderId === user?.userId ? "self" : ""
              }`}
            >
              <span>{message && message.text}</span>
              <span className="message-footer">
                {/* {moment(message.createAt).calendar()} */}
              </span>
            </Stack>
          ))}
      </Stack>
      <Stack direction={"horizontal"} gap={3} className="chat-input">
        <InputEmoji value={textMessage} onChange={setTextMessage} />
        <button
          className="send-btn"
          onClick={() => sendTextMessage(textMessage, user, currentChat?._id)}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="send fill" />
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
