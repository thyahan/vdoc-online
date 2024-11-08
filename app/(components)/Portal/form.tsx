import { useState } from "react";

type Props = {
  onSubmit: ({ roomName, username }: { roomName: string; username: string }) => void;
};

export default function FormPortal({ onSubmit }: Props) {
  const [state, setState] = useState({
    roomName: "",
    username: "",
  });

  return (
    <div className="xl:w-[480px] w-full gap-4 flex flex-col p-4 border border-gray-50 shadow-md rounded-md">
      <input
        className="w-full border border-gray-500 rounded-md p-2"
        type="text"
        placeholder="Room Name"
        id="roomName"
        name="roomName"
        onChange={e => setState({ ...state, roomName: e.target.value })}
      />
      <i>{`room name ใส่อะไรก็ได้ แค่ตั้งชื่อให้ตรงกัน เช่น "vdoc1"`}</i>
      <input
        className="w-full border border-gray-500 rounded-md p-2"
        type="text"
        placeholder="Username"
        id="roomName"
        name="roomName"
        onChange={e => setState({ ...state, username: e.target.value })}
      />
      <i>{`สำหรับ Agent ใส่ username "agent"`}</i>
      <i>{`สำหรับ Customer ใส่ username "customer"`}</i>
      <button
        onClick={() => {
          console.log("click submit form button current value is ", state);
          onSubmit(state);
        }}
        className="p-4 font-bold px-8 mt-16 bg-slate-700 rounded-md shadow-md hover:bg-slate-600 text-white">
        Join Room
      </button>
    </div>
  );
}
