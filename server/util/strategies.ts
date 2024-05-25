import { Strategy } from '../models/strategy';

export const pushNewIndicator = (strategyId, indicator) => {
  return new Promise((resolve, reject) => {
    Strategy.findByIdAndUpdate(
      strategyId,
      { $push: { indicators: indicator } },
      null,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
};

export const updateStrategy = (strategy) => {
  return new Promise((resolve, reject) => {
    Strategy.findByIdAndUpdate(strategy._id, strategy, null, (error) => {
      if (error) return reject(error);
      resolve(null);
    });
  });
};
