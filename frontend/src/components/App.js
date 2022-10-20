import React from "react";
import { render } from "react-dom";
import { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import RoomCreatePage from "./RoomCreatePage";
import Room from "./Room";
import HomePage from "./HomePage";

export default function App() {
  const [roomCode, setroomCode] = useState(null);

  useEffect(() => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setroomCode(data.code);
      });
  }, []);

  const clearRoomCode = () => {
    setroomCode(null);
  };

  return (
    <Fragment class="center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage roomCode={roomCode} />} />
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/create" element={<RoomCreatePage />} />
          <Route
            path="/room/:roomCode"
            element={<Room clearRoomCode={clearRoomCode} />}
          />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
