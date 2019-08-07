import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import SnapshotState from 'jest-snapshot/build/State';

const TestComp = props => {
  return (
    <div>
      HOMEPAGE
    </div>
  );
};

/* function form

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={TestComp} />
        <Route path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}*/

/* class form

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={TestComp} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

*/

/*
        <Route path='/signin' component={SignInAndSignUpPage} />
*/

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({ currentUser: user})
      //console.log(user);
      //createUserProfileDocument(user);

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => { //subscribes to userRef
            this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            }
            ,
            () => {
              console.log(this.state);
            }
            );
        });
      }

      this.setState({ currentUser: userAuth });
    });

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <HashRouter basename='/'>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={TestComp} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
