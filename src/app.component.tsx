import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './styles/app.scss';

import HeaderComponent from "./components/header/header.component";
import AuthComponent from './components/auth/auth.component';
import { connect } from 'react-redux';
import { userActions } from './redux/action-creators/user.action.creator';
import { Dispatch } from 'redux';
import { UserActions } from './redux/actions/user.actions';
import { IAppState } from './redux/app-state';
import Cominity from './components/comunities/comunities';
import SignUpComponent from './components/auth/signup/signup.component';

/**
 * Interface para mapear las propiedades del 
 * state del método mapStateToProps
 */
interface IAppProps {
  isFacebookLogin: boolean
}

class App extends React.Component<IAppProps, {}> {

  constructor(props: any) {
    super(props);

    // reset login status
    props.startFacebookRequestlogin();


  }

  clicked = () => {
    console.log("click");
  }

  responseFacebook = (response: any) => {
    console.log(response);
  }

  render() {

    if (this.props.isFacebookLogin) {
      console.log("esta logueado");
    }

    return (
      <div className="maximun-size">

        <HeaderComponent />
        <main className="test-border main-container maximun-size">

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
    );
  }
}


const mapStateToProps = (state: IAppState, ownProps: any): IAppProps => {
  console.log(state);
  return {
    isFacebookLogin: state.userState.isFacebookLogginIn
  }
};


const mapDispatchToProps = (dispatch: Dispatch<UserActions>) => {
  return {
    startFacebookRequestlogin: () => dispatch(userActions.startFacebookRequestlogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
