import React, { useState, useEffect, setError } from "react";
import { Container, Grid, Typography, TextField, Box } from "@material-ui/core";
import CustomPlaytimeTable from "../components/CustomPlaytimeTable";
import CustomPlayersTable from "../components/CustomPlayersTable";

// Table head titles for parameters
const playtimeTableHeads = ["Games", "Platforms", "Genre", "Total play time"];
const playersTableHeads = ["Games", "Platforms", "Genre", "Number of players"];

function Main() {
  const [itemsByPlaytime, setItemsByPlayTime] = useState([]);
  const [itemsByPlayers, setItemsByPlayers] = useState([]);

  const [playtimeGenre, setPlaytimeGenre] = useState("");
  const [playtimePlatform, setPlaytimePlatform] = useState("");
  const [playersGenre, setPlayersGenre] = useState("");
  const [playersPlatform, setPlayersPlatform] = useState("");

  useEffect(() => {
    fetch(
      "http://localhost:3100/select_top_by_playtime?" +
        (playtimeGenre !== "" ? "genre=" + playtimeGenre : "") +
        (playtimePlatform !== "" ? "platform=" + playtimePlatform : ""),
      {
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsByPlayTime(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [playtimeGenre, playtimePlatform]);

  useEffect(() => {
    fetch(
      "http://localhost:3100/select_top_by_players?" +
        (playersGenre !== "" ? "genre=" + playersGenre : "") +
        (playersPlatform !== "" ? "platform=" + playersPlatform : ""),
      {
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsByPlayers(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [playersGenre, playersPlatform]);

  useEffect(() => {
    fetch("http://localhost:3100/select_top_by_playtime", {
      mode: "cors",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsByPlayTime(result);
        },
        (error) => {
          console.log("Error on by time played");
          setError(error);
        }
      );

    fetch("http://localhost:3100/select_top_by_players", {
      mode: "cors",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsByPlayers(result);
        },
        (error) => {
          console.log("Error on by players");
          setError(error);
        }
      );
  }, []);

  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={5}
        justifyContent="center"
        alignItems="stretch"
        direction="column"
      >
        <Grid item lg={12}>
          <Box my={2}>
            <Typography variant="h4" component="h4">
              Top games by playtime
            </Typography>
            <Box my={2} display="flex" justifyContent="flex-end">
              <Box>
                <TextField
                  m={2}
                  size="small"
                  id="filter_platform_playtime"
                  label="Filter by platform"
                  variant="outlined"
                  onChange={(event) => {
                    setPlaytimePlatform(event.target.value);
                  }}
                />
              </Box>
              <Box ml={1}>
                <TextField
                  m={2}
                  size="small"
                  id="filter_genre_playtime"
                  label="Filter by genre"
                  variant="outlined"
                  onChange={(event) => {
                    setPlaytimeGenre(event.target.value);
                  }}
                />
              </Box>
            </Box>
          </Box>
          <CustomPlaytimeTable heads={playtimeTableHeads} rows={itemsByPlaytime} />
        </Grid>

        <Grid item lg={12}>
          <Box my={2}>
            <Typography variant="h4" component="h4">
              Top games by number of players
            </Typography>
            <Box my={2} display="flex" justifyContent="flex-end">
              <Box>
                <TextField
                  size="small"
                  id="filter_platform_players"
                  label="Filter by platform"
                  variant="outlined"
                  onChange={(event) => {
                    setPlayersPlatform(event.target.value);
                  }}
                />
              </Box>
              <Box ml={1}>
                <TextField
                  size="small"
                  id="filter_genre_players"
                  label="Filter by genre"
                  variant="outlined"
                  onChange={(event) => {
                    setPlayersGenre(event.target.value);
                  }}
                />
              </Box>
            </Box>
          </Box>
          <CustomPlayersTable heads={playersTableHeads} rows={itemsByPlayers} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Main;
