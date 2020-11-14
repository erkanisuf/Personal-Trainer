import "./App.css";
import Layout from "./Layout/Layout";
import Customers from "./components/Customers";
import Calendar from "./components/Calendar/Calendar";
import { Switch, Route } from "react-router-dom";
import Trainings from "./components/Trainings/Trainings";
import Home from "./Layout/Home";
import DataStats from "./components/DataStats/DataStats";

function App() {
  return (
    <Layout>
      <div className="App">
        <div style={{ marginTop: "50px" }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/customers">
              <Customers />
            </Route>
            <Route path="/trainings">
              <Trainings />
            </Route>
            <Route path="/calendar">
              <Calendar />
            </Route>
            <Route path="/datastats">
              <DataStats />
            </Route>
          </Switch>
        </div>
      </div>
    </Layout>
  );
}

export default App;
