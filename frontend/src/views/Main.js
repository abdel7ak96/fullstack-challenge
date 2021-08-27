import React, { useState, useEffect, setError } from "react";
import { Container, Grid, Typography, TextField, Box } from "@material-ui/core";

// Custom modules
import CustomPlaytimeTable from "../components/CustomPlaytimeTable";
import CustomPlayersTable from "../components/CustomPlayersTable";

// Table head titles for parameters
const playtimeTableHeads = ["Game", "Platforms", "Genre", "Total play time"];
const playersTableHeads = ["Game", "Platforms", "Genre", "Number of players"];

// The function used to perform fetching at first rendering (mounting) and then subsequent state changes
const CustomFetch = (url, stateSetter, param = { genre: "", platform: "" }) => {
  fetch(
    url +
      (param.genre !== "" ? "genre=" + param.genre : "") +
      (param.platform !== "" ? "&platform=" + param.platform : ""),
    {
      mode: "cors",
    }
  )
    .then((res) => res.json())
    .then(
      (result) => {
        stateSetter(result);
      },
      (error) => {
        setError(error);
      }
    );
};

function Main() {
  // Fetched data states
  const [itemsByPlaytime, setItemsByPlayTime] = useState([]);
  const [itemsByPlayers, setItemsByPlayers] = useState([]);

  // Filter inputs states
  const [playtimeGenre, setPlaytimeGenre] = useState("");
  const [playtimePlatform, setPlaytimePlatform] = useState("");
  const [playersGenre, setPlayersGenre] = useState("");
  const [playersPlatform, setPlayersPlatform] = useState("");

  // First mount state hook
  useEffect(() => {
    CustomFetch(
      "http://localhost:3100/select_top_by_playtime",
      setItemsByPlayTime
    );
    CustomFetch(
      "http://localhost:3100/select_top_by_players",
      setItemsByPlayers
    );
  }, []);

  // Playtime table filters state hook
  useEffect(() => {
    CustomFetch(
      "http://localhost:3100/select_top_by_playtime?",
      setItemsByPlayTime,
      { genre: playtimeGenre, platform: playtimePlatform }
    );
  }, [playtimeGenre, playtimePlatform]);

  // Players table filters state hook
  useEffect(() => {
    CustomFetch(
      "http://localhost:3100/select_top_by_players?",
      setItemsByPlayers,
      { genre: playersGenre, platform: playersPlatform }
    );
  }, [playersGenre, playersPlatform]);

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
          <CustomPlaytimeTable
            heads={playtimeTableHeads}
            rows={itemsByPlaytime}
          />
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
