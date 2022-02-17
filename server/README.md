
# AT Platform


## Implemented Technical Indicators


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


## Improvements to be made

- Check candle alignment and call cron job immediately after candle completes -> Calling Cron job after a few more seconds of the minute
- Set hours of operation
- Check Crossover when curr and next values are the same - DONE 
- Change cron jobs, and instead call functions when prices update on OANDA API as a callback
- Create socket.io connection for when backtesting
- Add signal cooldown
- Add keepSignalFor
- Implement Strategy (if BUY close all SELL position and viceversa) - Default DONE
- Implement Indicator Output Formatting, similar to MovingAverage, from an array of values to an array of objects containing the values. - DONE
- Front-end Implement Indicator Editing on strategy edit page
- Bot editing implementation similar to strategy
- Need to add userId on all requests 
