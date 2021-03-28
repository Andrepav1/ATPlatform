
import { timeParse } from "d3-time-format";

function parseData() {
  let parseDate = timeParse("%Y-%m-%d");
	return function(d) {
		d.date = parseDate(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

