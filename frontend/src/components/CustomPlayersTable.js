import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core/styles";
  
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  function CustomPlayersTable({ heads, rows }) {
    const classes = useStyles();
  
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {heads.map((element, index) =>
                index === 0 ? (
                  <TableCell key={index}>{element}</TableCell>
                ) : (
                  <TableCell align="right" key={index}>{element}</TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.game}>
                <TableCell component="th" scope="row">
                  {row.game}
                </TableCell>
                <TableCell align="right">
                  {row.platforms.map((word) => word + " ")}
                </TableCell>
                <TableCell align="right">{row.genre}</TableCell>
                <TableCell align="right">{row.numberOfPlayers}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
  export default CustomPlayersTable;
  