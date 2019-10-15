import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './styles/app.scss';
import PokemonfightresultComponent from './components/pokemofightresult/pokemonfightresult.component';

class App extends React.Component {


  public render(): JSX.Element {

    return (

      <div className="maximun-size">
        <Router>

          <main className="main-container maximun-size">
            <Switch>
              <Route
                exact
                path="/pokemonfightresults"
                component={PokemonfightresultComponent} />
            </Switch>

          </main>
        </Router>
      </div>

    );
  }
}


export default (App);
