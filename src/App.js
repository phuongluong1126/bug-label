import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SearchBug from "./pages/SearchBug";
import Navbar from "./components/layout/Navbar";
import DetailBugReport from "./pages/DetailBugReport";
import AddBugReport from "./pages/AddBugReport";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/search-bug" />
          </Route>
          <Route path="/search-bug" exact>
            <SearchBug />
          </Route>
          <Route path="/add-bug-report" exact>
            <AddBugReport />
          </Route>
          <Route path="/bug-report/:id" component={DetailBugReport} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
