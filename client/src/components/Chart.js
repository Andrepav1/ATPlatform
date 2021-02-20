import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CandleStickChart from './CandleStickStockScaleChart'

import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import TypeChooser from 'react-stockcharts/lib/helper/TypeChooser';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: "red"
  }
}));

const parseDate = timeParse("%Y-%m-%d");

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

function getData(callback) {
	fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
  .then(response => response.text())
  .then(data => {
    callback(tsvParse(data, parseData(parseDate)))
  })
}

export default function Chart() {

  const styles = useStyles();

  const [data, setData] = useState();

  useEffect(() => {

    getData((data) => {
      setData(data);
    });

  }, [])

  if(!data) return null;

  return (
    <div style={{ flex: 1 }}>
			<TypeChooser>
				{type => <CandleStickChart type={type} data={data} />}
			</TypeChooser>
    </div>
  );
}