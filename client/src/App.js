import './App.css';
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Header from './components/Header'

import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import BacktestingPage from './pages/BacktestingPage'
import TradeHistoryPage from './pages/TradeHistoryPage'
import StrategiesPage from './pages/StrategiesPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import EditStrategyPage from './pages/EditStrategyPage';

function App({ authenticated }) {

  if(authenticated) {
    return (
      <Router>
        <div className="App">
          <Header />
          <Sidebar />
          <Switch>
            <Redirect exact from='/landing' to='/'/>
            <Route path="/" exact component={DashboardPage} />
            <Route exact path="/strategies" component={StrategiesPage} />
            <Route path="/strategies/edit" component={EditStrategyPage} />
            <Route path="/backtesting" component={BacktestingPage} />
            <Route path="/history" component={TradeHistoryPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
  else {
    return (
      <Router>
        <div className="Landing">
          <Route path="/landing" exact render={() => <LandingPage />} />
          <Redirect to="/landing" />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated
  }
}

export default connect(mapStateToProps)(App)
