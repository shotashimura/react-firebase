// App.jsx
import React from "react";
import ItemList from "./components/ItemList";
import Item from "./components/Item";
import { BrowserRouter, Route, Link } from "react-router-dom";

const App = () => {
  const toDoStatusArr = ["none", "done"];
  return (
    <BrowserRouter>
      <div>
        <div>
          <h1 style={{ color: "orange" }}>リマインダー</h1>
          <ul>
            <li>
              <Link to="/">これから行うタスク</Link>
            </li>
            <li>
              <Link to="/isDone">実行済み</Link>
            </li>
          </ul>
        </div>
        <hr />
        <Route
          exact
          path="/"
          render={(props) => <ItemList toDoStatus={toDoStatusArr[0]} />}
        />
        <Route
          path="/isDone"
          render={(props) => <ItemList toDoStatus={toDoStatusArr[1]} />}
        />
      </div>
    </BrowserRouter>
  );
};
export default App;
