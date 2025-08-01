"use client";

import { useEffect, useState } from "react";

type FoundUser = {
  userId: string;
  username: string;
  email: string;
};

export const useUserByEmail = (email: string) => {
  const [user, setUser] = useState<FoundUser>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `/api/user/email?email=${encodeURIComponent(email)}`
        );

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  return { user, isLoading };
};
