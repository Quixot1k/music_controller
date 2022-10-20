import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Collapse,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function RoomCreatePage({
  update = false,
  DefaultVotesToSkip = 1,
  DefaultGuestCanPauseRoom = false,
  roomCode,
}) {
  const [guestCanPause, setGuestCanPause] = useState(DefaultGuestCanPauseRoom);
  const [votesToSkip, setVotesToSkip] = useState(DefaultVotesToSkip);
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const title = update ? "Update Room" : "Create A Room";

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPause = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);
  };

  const handleCreateOrUpdateRoomButton = () => {
    if (update) {
      console.log("update");
      // POST method toward 'api/update-room'
      const req = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          votes_to_skip: votesToSkip,
          guest_can_pause: guestCanPause,
          code: roomCode,
        }),
      };
      fetch("/api/update-room/", req).then((res) => {
        if (res.ok) {
          setPrompt("Room Updated Successfully");
        } else {
          setPrompt("Whoops, updated failed...");
        }
      });
    } else {
      console.log("create");
      // POST method toward 'api/create-room'
      const req = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          votes_to_skip: votesToSkip,
          guest_can_pause: guestCanPause,
        }),
      };
      fetch("/api/create-room/", req).then((res) =>
        res.json().then((data) => navigate("/room/" + data.code))
      );
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={prompt != ""}>
          {prompt == "Room Updated Successfully" ? (
            <Alert severity="success" onClose={() => setPrompt("")}>
              Room Updated Successfully
            </Alert>
          ) : (
            <Alert severity="error" onClose={() => setPrompt("")}>
              Whoops, updated failed...
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause}
            onChange={handleGuestCanPause}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleCreateOrUpdateRoomButton}
        >
          {title}
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        {update ? null : (
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
