import React, { ReactNode } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { sessionState } from "@/libs/states";
import { Session } from "@supabase/supabase-js";
import { Usermemo } from "@/types/Usermemo";

interface MemoSidebarLayoutProps {
  children: ReactNode;
  dates: string[];
  setDates: (dates: string[]) => void;
  setUsermemo: (memos: Usermemo[]) => void;
}

export const MemoSidebarLayout: React.FC<MemoSidebarLayoutProps> = ({
  children,
  dates,
  setDates,
  setUsermemo,
}) => {
  const [session] = useRecoilState<Session | null>(sessionState);
  async function getDates() {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/usermemo_dates`;
      const config = {
        headers: {
          Authorization: `Bearer ${session?.user.id}`,
        },
      };
      const res = await axios.get(url, config);
      setDates(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function GetDateMemo(date: string) {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/usermemo?created_at=${date}`;
      const config = {
        headers: {
          Authorization: `Bearer ${session?.user.id}`,
        },
      };
      const res = await axios.get(url, config);
      if (res.status !== 200) {
        throw new Error("Failed to fetch items");
      }
      setUsermemo(res.data as Usermemo[]);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getDates();
  }, []);

  return (
    <Flex minHeight="100vh">
      {/* 左サイドバー */}
      <Box
        as="aside"
        width={{ base: "20%", md: "30%" }}
        display={{ base: "none", md: "block" }}
        bg="orange.200"
        padding="4"
        boxShadow="md"
      >
        {dates.map((date) => (
          <Box onClick={GetDateMemo.bind(null, date)}>
            <Text fontSize="md" fontWeight="bold" mb="4">
              {convertISOtoDate(date)}
            </Text>
          </Box>
        ))}
      </Box>

      {/* メインコンテンツ */}
      <Box as="main" flex="1" bg="orange.100" padding="6">
        {children}
      </Box>
    </Flex>
  );
};

function convertISOtoDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString();
}
