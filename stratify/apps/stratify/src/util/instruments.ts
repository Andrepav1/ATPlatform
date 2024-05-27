import fx from "simple-fxtrade";
import { CURRENCY_UNIT, CFD_UNIT, METAL_UNIT } from "./constants";

type CandlesArgs = {
  id: string;
  granularity: any;
  from?: any;
  to?: any;
  count?: number;
  price?: number;
};

// Do not include first as candles are requested 5 seconds after the period,
// Avoiding an incomplete candle of 5 seconds
export const getInstrument = ({
  id,
  granularity,
  from,
  to,
  count,
  price
}: CandlesArgs) => {
  return new Promise((resolve, reject) => {
    fx.candles({ id, granularity, from, to, count, price })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getInstruments = async (instruments, granularity) => {
  return await Promise.all(
    instruments.map((id) => getInstrument({ id, granularity }))
  );
};

export const InstrumentType = {
  AU200_AUD: "CFD",
  AUD_CAD: "CURRENCY",
  AUD_CHF: "CURRENCY",
  AUD_HKD: "CURRENCY",
  AUD_JPY: "CURRENCY",
  AUD_NZD: "CURRENCY",
  AUD_SGD: "CURRENCY",
  AUD_USD: "CURRENCY",
  BCO_USD: "CFD",
  CAD_CHF: "CURRENCY",
  CAD_HKD: "CURRENCY",
  CAD_JPY: "CURRENCY",
  CAD_SGD: "CURRENCY",
  CHF_HKD: "CURRENCY",
  CHF_JPY: "CURRENCY",
  CHF_ZAR: "CURRENCY",
  CN50_USD: "CFD",
  CORN_USD: "CFD",
  DE10YB_EUR: "CFD",
  DE30_EUR: "CFD",
  EU50_EUR: "CFD",
  EUR_AUD: "CURRENCY",
  EUR_CAD: "CURRENCY",
  EUR_CHF: "CURRENCY",
  EUR_CZK: "CURRENCY",
  EUR_DKK: "CURRENCY",
  EUR_GBP: "CURRENCY",
  EUR_HKD: "CURRENCY",
  EUR_HUF: "CURRENCY",
  EUR_JPY: "CURRENCY",
  EUR_NOK: "CURRENCY",
  EUR_NZD: "CURRENCY",
  EUR_PLN: "CURRENCY",
  EUR_SEK: "CURRENCY",
  EUR_SGD: "CURRENCY",
  EUR_TRY: "CURRENCY",
  EUR_USD: "CURRENCY",
  EUR_ZAR: "CURRENCY",
  FR40_EUR: "CFD",
  GBP_AUD: "CURRENCY",
  GBP_CAD: "CURRENCY",
  GBP_CHF: "CURRENCY",
  GBP_HKD: "CURRENCY",
  GBP_JPY: "CURRENCY",
  GBP_NZD: "CURRENCY",
  GBP_PLN: "CURRENCY",
  GBP_SGD: "CURRENCY",
  GBP_USD: "CURRENCY",
  GBP_ZAR: "CURRENCY",
  HK33_HKD: "CFD",
  HKD_JPY: "CURRENCY",
  IN50_USD: "CFD",
  JP225_USD: "CFD",
  NAS100_USD: "CFD",
  NATGAS_USD: "CFD",
  NL25_EUR: "CFD",
  NZD_CAD: "CURRENCY",
  NZD_CHF: "CURRENCY",
  NZD_HKD: "CURRENCY",
  NZD_JPY: "CURRENCY",
  NZD_SGD: "CURRENCY",
  NZD_USD: "CURRENCY",
  SG30_SGD: "CFD",
  SGD_CHF: "CURRENCY",
  SGD_JPY: "CURRENCY",
  SOYBN_USD: "CFD",
  SPX500_USD: "CFD",
  SUGAR_USD: "CFD",
  TRY_JPY: "CURRENCY",
  TWIX_USD: "CFD",
  UK100_GBP: "CFD",
  UK10YB_GBP: "CFD",
  US2000_USD: "CFD",
  US30_USD: "CFD",
  USB02Y_USD: "CFD",
  USB05Y_USD: "CFD",
  USB10Y_USD: "CFD",
  USB30Y_USD: "CFD",
  USD_CAD: "CURRENCY",
  USD_CHF: "CURRENCY",
  USD_CNH: "CURRENCY",
  USD_CZK: "CURRENCY",
  USD_DKK: "CURRENCY",
  USD_HKD: "CURRENCY",
  USD_HUF: "CURRENCY",
  USD_INR: "CURRENCY",
  USD_JPY: "CURRENCY",
  USD_MXN: "CURRENCY",
  USD_NOK: "CURRENCY",
  USD_PLN: "CURRENCY",
  USD_SEK: "CURRENCY",
  USD_SGD: "CURRENCY",
  USD_THB: "CURRENCY",
  USD_TRY: "CURRENCY",
  USD_ZAR: "CURRENCY",
  WHEAT_USD: "CFD",
  WTICO_USD: "CFD",
  XAG_AUD: "METAL",
  XAG_CAD: "METAL",
  XAG_CHF: "METAL",
  XAG_EUR: "METAL",
  XAG_GBP: "METAL",
  XAG_HKD: "METAL",
  XAG_JPY: "METAL",
  XAG_NZD: "METAL",
  XAG_SGD: "METAL",
  XAG_USD: "METAL",
  XAU_AUD: "METAL",
  XAU_CAD: "METAL",
  XAU_CHF: "METAL",
  XAU_EUR: "METAL",
  XAU_GBP: "METAL",
  XAU_HKD: "METAL",
  XAU_JPY: "METAL",
  XAU_NZD: "METAL",
  XAU_SGD: "METAL",
  XAU_USD: "METAL",
  XAU_XAG: "METAL",
  XCU_USD: "CFD",
  XPD_USD: "METAL",
  XPT_USD: "METAL",
  ZAR_JPY: "CURRENCY"
};

export const getInstrumentType = (instrument) => {
  return InstrumentType[instrument];
};

export const getInstrumentUnits = (instrument, lotSize) => {
  switch (getInstrumentType(instrument)) {
    case "CFD":
      return lotSize * CFD_UNIT;
    case "METAL":
      return lotSize * METAL_UNIT;
    case "CURRENCY":
      return lotSize * CURRENCY_UNIT;
    default:
      return lotSize * CURRENCY_UNIT; // Currency by default
  }
};

export const getInstrumentLotSize = (instrument, units) => {
  switch (getInstrumentType(instrument)) {
    case "CFD":
      return Math.abs(units / CFD_UNIT);
    case "METAL":
      return Math.abs(units / METAL_UNIT);
    case "CURRENCY":
      return Math.abs(units / CURRENCY_UNIT);
    default:
      return Math.abs(units / CURRENCY_UNIT); // Currency by default
  }
};
