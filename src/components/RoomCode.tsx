import { useCallback } from "react";

import copyImg from "../assets/icons/copy.svg";

import "../styles/components/room-code.scss";

interface RoomCodeProps {
  code: string;
}

export function RoomCode({ code }: RoomCodeProps) {
  const copyRoomCodeToClipboard = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <button onClick={copyRoomCodeToClipboard} className="room-code">
      <div>
        <img src={copyImg} alt="Copiar o código da sala" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
}
