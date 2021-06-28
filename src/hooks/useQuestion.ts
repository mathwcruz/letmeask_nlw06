import { useState, useEffect } from "react";

import { useAuth } from "./useAuth";

import { database } from "../services/firebase";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

interface QuestionData {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeId: string | undefined;
  likeCount: number;
}

export function useQuestion(id: string) {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions =
        databaseRoom?.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value?.content,
            author: value?.author,
            isHighlighted: value?.isHighlighted,
            isAnswered: value?.isAnswered,
            likeCount: Object.values(value?.likes ?? {})?.length,
            likeId: Object.entries(value?.likes ?? {})?.find(
              ([key, value]) => value.authorId === user?.id
            )?.[0],
          };
        }
      );

      const questionsSorted = parsedQuestions.sort(
        (a, b) => a?.likeCount - b?.likeCount
      );

      setTitle(databaseRoom?.title);
      setQuestions(questionsSorted);
    });

    return () => {
      roomRef.off("value");
    };
  }, [id, user?.id]);

  return { questions, title };
}
