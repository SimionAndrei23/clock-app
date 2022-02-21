
import './App.css';
import ClockAccess from './components/ClockAccess';
import ClockAddAlarm from './components/ClockAddAlarm';
import ClockTimer from './components/ClockTimer';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path = '/' element = {<ClockAccess />} />
          <Route path = '/addAlarm' element = {<ClockAddAlarm />} />
          <Route path = '/clockTimer' element = {<ClockTimer />} />
        </Routes>
    </div>
   </BrowserRouter>
  );
}

export default App;
