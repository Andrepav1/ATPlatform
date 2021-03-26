
# AT Platform



## Technical Indicators To Implement:


### Trending Indicators:
- SMA
- EMA
- WMA
- WEMA
- MACD
- TRIX
- PSAR

### Volatility Indicators:
- ATR

### Momentum Indicators:
- ADX
- AwesomeOscillator
- ROC
- RSI
- MFI
- CCI
- Stochastic
- StochasticRSI
- WilliamsR


### Volume Indicators:
- ADL
- OBV


### Other Indicator
- BollingerBands
- ForceIndex
- TypicalPrice,
- VWAP
- VolumeProfile
- IchimokuCloud



## Example Strategies 
- MovingAveragePriceCrossover - DONE
- DoubleMovingAverageCrossover - DONE
- TripleMovingAverageCrossover

## TODO 

- Check candle alignment and call cron job immediately after candle completes
- Set hours of operation
- Check Crossover when curr and next values are the same
- Change cron jobs, and instead call functions when prices update on OANDA API as a callback
- 