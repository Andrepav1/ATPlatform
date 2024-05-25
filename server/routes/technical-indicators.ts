import express from 'express';
import {
  getIndicatorComponents,
  getIndicatorConfig,
  technicalIndicators
} from '../util/technical-indicator';

const router = express.Router();

// get all indicators
router.get('/', (_req, res, _next) => {
  let tiArray = Object.values(technicalIndicators);
  const formattedIndicators = tiArray.map((indicator) => {
    return {
      name: indicator.name,
      config: getIndicatorConfig(indicator.name),
      components: getIndicatorComponents(indicator.name)
    };
  });

  res.json(formattedIndicators);
});

export default router;
