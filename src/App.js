import { Switch, Route, Redirect } from "react-router-dom";

import MainHeader from "./components/MainHeader/MainHeader";

import Welcome from "./pages/Welcome";
import Game from "./pages/Game";
import Config from "./pages/Config";
import Stats from "./pages/Stats";
import About from "./pages/About";
import Error from "./pages/Error";
import Sandbox from "./pages/Sandbox";

import "./App.css";

function App() {
  return (
    <div>
      <MainHeader />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/welcome" />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/config">
          <Config />
        </Route>
        <Route path="/stats">
          <Stats />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/sandbox">
          <Sandbox />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
