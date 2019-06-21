import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './styles/app.scss';

import HeaderComponent from "./components/header/header.component";
import AuthComponent from './components/auth/auth.component';

const App: React.FC = () => {
  return (
    <div className="maximun-size">

      <HeaderComponent />

      <main className="test-border main-container maximun-size">
        <Router>
          <Route exact path="/" component={AuthComponent} />
        </Router>
      </main>
      <footer>

      </footer>

    </div>
  );
}

export default App;
