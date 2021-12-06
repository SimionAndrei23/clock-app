
import './App.css';
import ClockAccess from './ClockAccess';
import ClockAddAlarm from './ClockAddAlarm';
import ClockTimer from './ClockTimer';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {
  return (
   <Router>
      <div className="App">
        <Switch>
          <Route exact path = '/'>
            <ClockAccess />
          </Route>
          <Route exact path = '/addAlarm'>
            <ClockAddAlarm />
          </Route>
          <Route exact path = '/clockTimer'>
            <ClockTimer />
          </Route>
        </Switch>
    </div>
   </Router>
  );
}

export default App;
