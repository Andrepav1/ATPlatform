import fx from "simple-fxtrade";

export const placeOrder = async (
  instrument: string,
  units: number, // ?
  type = "MARKET",
  timeInForce = "FOK"
) => {
  return await fx.orders.create({
    order: {
      instrument,
      units,
      timeInForce,
      type
    }
  });
};
