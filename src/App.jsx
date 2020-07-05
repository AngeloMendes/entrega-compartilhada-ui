import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Payment from 'pages/Payment';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import Routes from './pages/Routes';
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <Dashboard>
        <Switch>
          <Route path="/rotas">
            <Routes />
          </Route>
          <Route path="/pedidos">
            <Orders />
          </Route>
          <Route path="/pagamento">
            <Payment />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Dashboard>
    </Router>
  );
}

export default App;
