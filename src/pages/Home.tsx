import { useState, useCallback, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "../components/Button";

import { useAuth } from "../hooks/auth";

import { database } from "../services/firebase";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/icons/google-icon.svg";

import "../styles/pages/auth.scss";

export function Home() {
  const { user, handleSignInWithGoogle } = useAuth();

  const history = useHistory();
  const [roomCode, setRoomCode] = useState("");

  const handleCreateRoom = useCallback(async () => {
    if (!user) {
      try {
        await handleSignInWithGoogle();
      } catch (error) {
        alert("Erro na autenticação");
      }
    }

    history.push("/rooms/new");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleJoinRoom = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (roomCode.trim() === "") {
        alert("O campo de código da sala está vazio");

        return;
      }

      const roomRef = await database.ref(`rooms/${roomCode}`).get(); // buscando os dados do nome da sala inserida pelo user

      if (!roomRef.exists()) {
        alert("Essa sala não existe");
        return;
      }

      if (roomRef.val().closedAt) {
        alert("Essa sala já foi encerrada");
        return;
      }

      history.push(`/rooms/${roomCode}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roomCode]
  );

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Iluestração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tira as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Entre com o Google" />
            Crie a sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
