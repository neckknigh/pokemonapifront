import React from 'react';
import './styles/app.scss';
import TestComponent from "./components/testcomponent/testcomponent";
import Headercomponent from "./components/header/headercomponent";

const App: React.FC = () => {
  return (
    <div className="App">
      <Headercomponent />

    </div>
  );
}

export default App;
