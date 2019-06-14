import React from 'react';
import { Route, withRouter, NavLink } from 'react-router-dom';

import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Jokes from './components/Jokes';

class App extends React.Component {
  render () {
    return (
      <div className="app">
        <header className='head'>
          <h1>Dad Jokes</h1>
          <nav className='nav'>
            <NavLink to='/signup'>Sign Up</NavLink>
            <NavLink to='/signin'>Sign In</NavLink>
            <NavLink to='/jokes'>Giggle Box</NavLink>
            <button onClick={this.logout}>Finito</button>
          </nav>
        </header>
        <main>
          <Route path='/jokes' component={Jokes}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
        </main>
      </div>
    );
    }  
}

export default withRouter(App);
