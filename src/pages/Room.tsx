import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";

import { useAuth } from "../hooks/auth";
import { useRoom } from "../hooks/room";

import { database } from "../services/firebase";

import logoImg from "../assets/images/logo.svg";

import "../styles/pages/room.scss";

interface RoomParams {
  id: string;
}

export function Room() {
  const { id } = useParams<RoomParams>();

  const { user } = useAuth();
  const { questions, title } = useRoom(id);

  const [newQuestion, setNewQuestion] = useState("");

  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault();

    if (newQuestion.trim() === "") {
      alert("Campo de pergunta está vazio");
      return;
    }

    if (!user) {
      alert("Você precisa estar autenticado para fazer uma pergunta");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${id}/questions`).push(question); // inserindo um novo dado dentro de "rooms";

    setNewQuestion(""); // resetando o input
  }

  return (
    <div className="page-room">
      <header>
        <div>
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={id} />
        </div>
      </header>

      <main className="content">
        <div>
          <h1>Sala {title}</h1>
          {questions?.length > 0 && (
            <>
              {questions?.length === 1 ? (
                <span>{questions?.length} pergunta</span>
              ) : (
                <span>{questions?.length} perguntas</span>
              )}
            </>
          )}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <footer>
            {!user ? (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            ) : (
              <div className="user-info">
                <img src={user?.avatar} alt={user?.name} />
                <span>{user?.name}</span>
              </div>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </footer>
        </form>

        <section className="question-list">
          {questions?.map((question) => (
            <Question
              key={question?.id}
              content={question?.content}
              author={question?.author}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
