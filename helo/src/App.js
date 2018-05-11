import React, { Component } from 'react';
// import Auth from './components/Auth/Auth';
import './App.css';
import routes from './routes';
// import Dashboard from './components/Dashboard/Dashboard';
// import Profile from './components/Profile/Profile';
// import Search from './components/Search/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
       {routes}
      </div>
    );
  }
}

export default App;
