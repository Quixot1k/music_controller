import React from "react";
import { ButtonGroup, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage({ roomCode }) {
  const navigate = useNavigate();
  return roomCode ? (
    navigate(`/room/${roomCode}`)
  ) : (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" compact="h3">
          House Party
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
