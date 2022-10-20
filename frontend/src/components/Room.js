import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import RoomCreatePage from "./RoomCreatePage";

export default function Room({ clearRoomCode }) {
  const [votesToSkip, setVotesToSkip] = useState(1);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [settings, setSettings] = useState(false);
  const { roomCode } = useParams();
  const navigate = useNavigate();

  const getRoomInfo = async () => {
    return fetch("/api/get-room" + "?code=" + roomCode)
      .then((res) => {
        if (!res.ok) {
          clearRoomCode();
          navigate("/");
        }
        return res.json();
      })
      .then((data) => {
        console.log("change room state");
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  };

  const handleLeaveButton = () => {
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room/", req).then((res) => {
      clearRoomCode();
      navigate("/");
    });
  };

  getRoomInfo();
  return settings ? (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <RoomCreatePage
          update={true}
          DefaultVotesToSkip={votesToSkip}
          DefaultGuestCanPauseRoom={guestCanPause}
          roomCode={roomCode}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setSettings(false)}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause: {guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {isHost.toString()}
        </Typography>
      </Grid>
      {isHost ? (
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSettings(true)}
          >
            Settings
          </Button>
        </Grid>
      ) : null}
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLeaveButton}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}
