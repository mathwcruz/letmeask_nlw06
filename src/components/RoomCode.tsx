import copyImg from "../assets/icons/copy.svg";

import "../styles/components/room-code.scss";

interface RoomCodeProps {
  code: string;
}

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button onClick={copyRoomCodeToClipboard} className="room-code">
      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
}
