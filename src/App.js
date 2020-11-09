import "./App.css";
import Layout from "./Layout/Layout";
import Customers from "./components/Customers";
import Calendar from "./components/Calendar/Calendar";
import { Switch, Route } from "react-router-dom";
import Trainings from "./components/Trainings/Trainings";

function App() {
  return (
    <Layout>
      <div className="App">
        <h1>Trainer</h1>

        <div>
          <Switch>
            <Route exact path="/"></Route>
            <Route path="/customers">
              <Customers />
            </Route>
            <Route path="/trainings">
              <Trainings />
            </Route>
            <Route path="/calendar">
              <Calendar />
            </Route>
          </Switch>
        </div>
      </div>
    </Layout>
  );
}

export default App;
