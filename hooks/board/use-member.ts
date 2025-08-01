"use client";

import { useEffect, useState } from "react";

type FoundMember = {
    user: {
      id: string
    username: string;
  };
};

export const useMemberByBoardId = (boardId: string) => {
  const [member, setMember] = useState<FoundMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `/api/service/${boardId}/user`
        );

        const data = await response.json();
        setMember(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [boardId]);

  return { member, isLoading };
};
