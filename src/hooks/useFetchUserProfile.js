import { useEffect, useState } from "react";
import { getRequest } from "../../src/components/utils/services";

const baseUrl = import.meta.env.VITE_API_URL;

export const useFetchUserProfile = (userId) => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      if (!userId) return null;

      try {
        const response = await getRequest(`${baseUrl}/users/profile/${userId}`);
        if (response.error) {
          throw new Error(response.error);
        }
        setUserProfile(response);
      } catch (error) {
        setError(error.message);
      }
    };

    getUserProfile();
  }, [userId]);

  return { userProfile, error };
};
