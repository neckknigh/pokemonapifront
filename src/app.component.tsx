import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './styles/app.scss';

import HeaderComponent from "./components/header/header.component";
import AuthComponent from './components/auth/auth.component';
import { connect } from 'react-redux';
import { userActions } from './redux/action-creators/user.action.creator';
import { Dispatch } from 'redux';
import { IAppState } from './redux/app-state';
import Cominity from './components/comunities/comunities';
import SignUpComponent from './components/auth/signup/signup.component';
// @ts-ignore
import LoadingOverlay from 'react-loading-overlay';
import { ConfigProvider as CP } from './services/config/config.service';
import { AppActions } from './redux/app.actions';

/**
 * Interface para mapear las propiedades del 
 * state del método mapStateToProps
 */
interface IAppProps {
  isAppLoading?: boolean,
  startFacebookRequestlogin?: () => any,
  setAppLoadingStatus?: (appIsLoading: boolean) => any
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

        <div className="maximun-size">
          <HeaderComponent />
          <main className="main-container maximun-size">

            <Router>
              <Route exact path="/" component={AuthComponent} />
              <Route exact path="/auth" component={AuthComponent} />
              <Route exact path="/comunities" component={Cominity} />
              <Route exact path="/signup" component={SignUpComponent} />

            </Router>
          </main>
          <footer>

          </footer>
        </div>

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


const mapDispatchToProps = (dispatch: Dispatch<AppActions>): IAppProps => {
  return {
    startFacebookRequestlogin: () => dispatch(userActions.startFacebookRequestlogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
