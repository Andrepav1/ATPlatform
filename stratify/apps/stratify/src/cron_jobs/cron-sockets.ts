import cron from "node-cron";
import fx from "simple-fxtrade";

import { getAccountSummary } from "../util/accounts";
import { getInstrumentLotSize } from "../util/instruments";
import { getBots } from "../util/bots";

const activeSockets = new Set();

const emitAccountSummary = () => {
  activeSockets.forEach((socket) => {
    const {
      // @ts-expect-error TS(2339): Property 'handshake' does not exist on type '{}'.
      handshake: {
        query: { accountId }
      }
    } = socket;
    getAccountSummary(accountId)
      .then((result) => {
        // console.log("emit summary");
        // @ts-expect-error TS(2339): Property 'emit' does not exist on type 'unknown'.
        socket.emit("Summary", result);
      })
      .catch((err) => {
        console.log("error emitting summary", err);
        // Error, don't emit anything
      });
  });
};

const emitOpenPositions = () => {
  activeSockets.forEach((socket) => {
    const {
      // @ts-expect-error TS(2339): Property 'handshake' does not exist on type '{}'.
      handshake: {
        query: { accountId }
      }
    } = socket;
    fx.trades()
      .then(({ trades }) => {
        // console.log("emit positions");
        trades = trades.map((trade) => {
          trade.lotSize = getInstrumentLotSize(
            trade.instrument,
            parseInt(trade.currentUnits)
          );
          return trade;
        });

        // @ts-expect-error TS(2339): Property 'emit' does not exist on type 'unknown'.
        socket.emit("OpenPositions", trades);
      })
      .catch((err) => {
        console.log("error emitting summary", err);
        // Error, don't emit anything
      });
  });
};

const emitBots = () => {
  activeSockets.forEach((socket) => {
    const {
      // @ts-expect-error TS(2339): Property 'handshake' does not exist on type '{}'.
      handshake: {
        query: { accountId }
      }
    } = socket;
    getBots()
      .then((bots) => {
        // console.log("emit positions");
        // @ts-expect-error TS(2339): Property 'emit' does not exist on type 'unknown'.
        socket.emit("Bots", bots);
      })
      .catch((err) => {
        console.log("error emitting summary", err);
        // Error, don't emit anything
      });
  });
};

cron.schedule("*/1 * * * * *", () => {
  emitAccountSummary();
  emitOpenPositions();
  emitBots();
});

export const addSocket = (socket) => {
  activeSockets.add(socket);
};

export const removeSocket = (socket) => {
  activeSockets.delete(socket);
};
