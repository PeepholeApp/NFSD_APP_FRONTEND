import { Stack } from "@mui/material";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  console.log("Recipient User:", recipientUser);

  // useEffect(() => {
  //   getChatConnections();
  // }, []);

  // const getChatConnections = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/profiles/user`,
  //       {
  //         params: {
  //           id: user.profileId,
  //         },
  //       }
  //     );
  //     const users = response.data;
  //     console.log("userrr:", users);
  //     setName(users);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //   }
  // };

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-item-center p-2 justify-content-between"
    >
      <div className="d-flex">
        <div className="me-2">A</div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">12/02/2024</div>
        <div className="user-online"></div>
      </div>
    </Stack>
  );
};

export default UserChat;
