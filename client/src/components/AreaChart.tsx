import React from "react";
import PropTypes from "prop-types";

import { ChartCanvas, Chart } from "react-stockcharts";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import { AreaSeries, CandlestickSeries } from "react-stockcharts/lib/series";

import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { curveMonotoneX } from "d3-shape";

import {
  createVerticalLinearGradient,
  hexToRGBA,
} from "react-stockcharts/lib/utils";

const canvasGradient = createVerticalLinearGradient([
  { stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
  { stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
  { stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

class AreaChart extends React.Component {
  render() {
    // @ts-expect-error TS(2339): Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    const { data, width, ratio } = this.props;

    const type = "svg";

    if (!data) return null;

    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={400}
        data={data}
        xAccessor={(d) => d.date}
        xScale={scaleTime()}
        xExtents={[new Date(2011, 0, 1), new Date(2013, 0, 2)]}
      >
        <Chart id={0} yExtents={(d) => d.close}>
          <defs>
            <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
              <stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
              <stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#4286f4" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" />
          <AreaSeries
            yAccessor={(d) => d.close}
            fill="url(#MyGradient)"
            strokeWidth={2}
            interpolation={curveMonotoneX}
            canvasGradient={canvasGradient}
          />
        </Chart>
      </ChartCanvas>
    );
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
AreaChart.propTypes = {
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
};

// @ts-expect-error TS(2629): Cannot assign to 'AreaChart' because it is a class... Remove this comment to see the full error message
AreaChart = fitWidth(AreaChart);

export default AreaChart;
