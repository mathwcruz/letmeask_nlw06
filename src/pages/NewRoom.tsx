import { useState, useCallback, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import { Button } from "../components/Button";

import { useAuth } from "../hooks/auth";

import { database } from "../services/firebase";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import "../styles/pages/auth.scss";

export function NewRoom() {
  const { user } = useAuth();

  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  const handleCreateRoom = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (newRoom.trim() === "") {
        alert("Campo de nome da sala está vazio");
        return;
      }

      const roomRef = database.ref("rooms"); // o banco será organizado com base no "rooms"
      const firebaseRoom = await roomRef.push({
        // inserindo um novo dado no banco
        title: newRoom,
        authorId: user?.id,
      });

      history.push(`/admin/rooms/${firebaseRoom?.key}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newRoom, user]
  );

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tira as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
