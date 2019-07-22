import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './styles/app.scss';

import HeaderComponent from "./components/header/header.component";
import AuthComponent from './components/auth/auth.component';
import { connect } from 'react-redux';
import { IAppState } from './redux/app-state';
import Cominity from './components/comunities/comunities';
import SignUpComponent from './components/auth/signup/signup.component';
// @ts-ignore
import LoadingOverlay from 'react-loading-overlay';
import { ConfigProvider as CP } from './services/config/config.service';
import ErrorMessageComponent from './components/widgets/error-message/error-message.component';

/**
 * Interface para mapear las propiedades del 
 * state del método mapStateToProps
 */
interface IAppProps {
  isAppLoading?: boolean
}

interface IApplicationState {
  loadingTextDisplay: boolean
}

class App extends React.Component<IAppProps, IApplicationState> {

  constructor(props: any) {
    super(props);

    this.state = {
      loadingTextDisplay: CP.get(CP.LOADING_TEXT_DISPLAY)
    }

  }

  render() {

    return (

      <LoadingOverlay
        active={this.props.isAppLoading}
        spinner
        text={this.state.loadingTextDisplay}
        className="maximun-size"
      >
        <Router>
          <div className="maximun-size">

            <HeaderComponent />
            <main className="main-container maximun-size">
              <ErrorMessageComponent />

              <Route exact path="/" component={AuthComponent} />
              <Route exact path="/auth" component={AuthComponent} />
              <Route exact path="/comunities" component={Cominity} />
              <Route exact path="/signup" component={SignUpComponent} />


            </main>
            <footer>

            </footer>
          </div>


        </Router>

      </LoadingOverlay>
    );
  }
}


const mapStateToProps = (state: IAppState): IAppProps => {
  console.log(state);
  return {
    isAppLoading: state.systemState.isAppLoading
  }
};


export default connect(mapStateToProps)(App);
