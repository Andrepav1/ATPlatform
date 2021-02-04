import React from 'react'
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'

import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import BacktestingPage from './pages/BacktestingPage'
import TradeHistoryPage from './pages/TradeHistoryPage'
import StrategiesPage from './pages/StrategiesPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Switch>
          <Route path="/" exact component={DashboardPage} />
          <Route path="/landing" exact component={LandingPage} />
          <Route path="/strategies" component={StrategiesPage} />
          <Route path="/backtesting" component={BacktestingPage} />
          <Route path="/history" component={TradeHistoryPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
