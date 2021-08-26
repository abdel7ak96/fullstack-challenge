import { Container, Grid, Typography, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24),
  createData("Ice cream sandwich", 237, 9.0, 37),
  createData("Eclair", 262, 16.0, 24),
  createData("Cupcake", 305, 3.7, 67),
  createData("Gingerbread", 356, 16.0, 49),
];

function Main() {
  const classes = useStyles();

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
                <TextField m={2} size="small" id="outlined-basic" label="Filter by genre" variant="outlined" />
              </Box>
              <Box ml={1}>
                <TextField m={2} size="small" id="outlined-basic" label="Filter by platform" variant="outlined" />
              </Box>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Games</TableCell>
                  <TableCell align="right">Platforms</TableCell>
                  <TableCell align="right">Genre</TableCell>
                  <TableCell align="right">Total play time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>


        <Grid item lg={12}>
          <Box my={2}>
            <Typography variant="h4" component="h4">
              Top games by number of players
            </Typography>
            <Box my={2} display="flex" justifyContent="flex-end">
              <Box>
                <TextField size="small" id="outlined-basic" label="Filter by genre" variant="outlined" />
              </Box>
              <Box ml={1}>
                <TextField size="small" id="outlined-basic" label="Filter by platform" variant="outlined" />
              </Box>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Game</TableCell>
                  <TableCell align="right">Platforms</TableCell>
                  <TableCell align="right">Genre</TableCell>
                  <TableCell align="right">Number of players</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Main;
