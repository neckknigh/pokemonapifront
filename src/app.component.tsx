import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './styles/app.scss';

import HeaderComponent from "./components/header/header.component";
import { connect } from 'react-redux';
import { IAppState } from './redux/app-state';
// @ts-ignore
import LoadingOverlay from 'react-loading-overlay';
import { ConfigProvider as CP } from './services/config/config.service';
import ErrorMessageComponent from './components/widgets/error-message/error-message.component';
import SideMenuComponent from './components/widgets/side-menu/side-menu.component';
import FooterComponent from './components/footer/footer.component';
import { secureComponentFactory } from './security/PrivateRoute';
import { privateRoutes } from './app.routing';



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

        <div className="maximun-size">
          <Router>
            <HeaderComponent />
            <main className="main-container maximun-size">
              <ErrorMessageComponent />
              <SideMenuComponent>
                {
                  privateRoutes.map((privateRoute: any, index: number) => {
                    return <Route
                      key={index}
                      exact
                      path={privateRoute.path}
                      component={secureComponentFactory(privateRoute.component)} />
                  })
                }
                <FooterComponent />
              </SideMenuComponent>

            </main>
          </Router>
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


export default connect(mapStateToProps)(App);
