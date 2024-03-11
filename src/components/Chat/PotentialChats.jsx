import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/Login";

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat } = useContext(ChatContext);

    console.log("PotentialChats", potentialChats);

    return (
        <div className="all-users">
            {potentialChats && 
                potentialChats.map((u, index) => {
                    return (
                        <div 
                            className="single-user" 
                            key={index} 
                            onClick={() => createChat(u.userId, user?.userId)}>
                            {u.name}
                            <span className="user-online"></span>
                        </div>
                    );
                })}
        </div>
    );
};
 
export default PotentialChats;
