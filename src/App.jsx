// App.jsx
import React from "react";
import ItemList from "./components/ItemList";

const App = () => {
  return (
    <div>
      <h1>React-Firebase Todo App</h1>
      {/* importしたコンポーネントを表示 */}
      <ItemList />
    </div>
  );
};
export default App;
