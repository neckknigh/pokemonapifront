import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './styles/app.scss';

import HeaderComponent from "./components/header/header.component";
import AuthComponent from './components/auth/auth.component';
import { connect } from 'react-redux';
import { IAppState } from './redux/app-state';
import SignUpComponent from './components/auth/signup/signup.component';
// @ts-ignore
import LoadingOverlay from 'react-loading-overlay';
import { ConfigProvider as CP } from './services/config/config.service';
import ErrorMessageComponent from './components/widgets/error-message/error-message.component';
import IncomingFeaturesComponent from './components/incoming-features/incoming-features.component';
import SideMenuComponent from './components/widgets/side-menu/side-menu.component';
import DashBoardComponent from './components/dashboard/dashboard.component';
import FooterComponent from './components/footer/footer.component';
import ComunitySummaryComponent from './components/comunities/comunity-summary/comunity-summary.component';
import { privateRoute } from './security/PrivateRoute';



/**
 * Interface para mapear las propiedades del 
 * state del método mapStateToProps
 */
export interface IAppProps {
  readonly isAppLoading?: boolean;
}

interface IApplicationState {
  loadingTextDisplay?: boolean;
}

class App extends React.Component<IAppProps, IApplicationState> {

  constructor(props: any) {
    super(props);

    this.state = {
      loadingTextDisplay: CP.get(CP.LOADING_TEXT_DISPLAY)
    }
  }


  public render(): JSX.Element {
    //debugger;

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
              <SideMenuComponent>

                <Switch>
                  <Route exact path="/" component={AuthComponent} />
                  <Route path="/auth" component={AuthComponent} />
                  <Route path="/comunity/:id([0-9]+)" component={privateRoute(ComunitySummaryComponent)} />
                  <Route path="/comunities/" component={privateRoute(DashBoardComponent)} />

                  <Route path="/signup" component={privateRoute(SignUpComponent)} />
                  <Route path="/incoming_features" component={privateRoute(IncomingFeaturesComponent)} />

                </Switch>

                <FooterComponent />
              </SideMenuComponent>

            </main>
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
