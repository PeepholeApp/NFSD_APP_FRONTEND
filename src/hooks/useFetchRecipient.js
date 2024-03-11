import { useEffect as ReactUseEffect, useState } from 'react';
import { getRequest } from "../../src/components/utils/services";

export const useFetchRecipientUser = (chat, user) => {
   const [recipientUser, setRecipientUser] = useState(null);
   const [error, setError] = useState(null);
 
   ReactUseEffect(() => {
     const fetchRecipientUser = async () => {
       try {
         const response = await getRequest(`/users/find/${chat.members.find(id => id !== user.id)}`);
         setRecipientUser(response);
       } catch (error) {
         console.error('Error in useFetchRecipient:', error);
         setError(error);
       }
     };
 
     if (chat && user) {
       fetchRecipientUser();
     }
   }, [chat, user]);
 
   return { recipientUser, error };
 };
 
