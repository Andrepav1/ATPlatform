import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Activity({ data }) {
  const styles = useStyles();

  if(!data) return null;

  console.log(data);
  return (
    <React.Fragment>
      <Title>Activity</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Instrument</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.instrument}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell align="right">{row.financing}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={styles.seeMore}>
        <Link color="primary">
          See more
        </Link>
      </div>
    </React.Fragment>
  );
}