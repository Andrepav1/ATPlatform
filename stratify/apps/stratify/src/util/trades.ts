import fx from "simple-fxtrade";

export const getTrades = async () => {
  return await fx.trades();
};

export const closeTrade = (id: string) => {
  return new Promise((resolve, reject) => {
    fx.trades
      .close({ id })
      .then((result) => {
        // console.log(result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
