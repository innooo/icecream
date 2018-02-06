import React, { Component } from 'react';
import {
  BowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// 引入组件
import Homepage from './../components/homepage/containers/homepageCON';
class Wrapper extends Component {
  render() {
    return (
      <Router>
        <Link to="/homepage">homepage</Link>
        <Route path="/homepage" component={Homepage} />
      </Router>
    );
  }
}
export default Homepage;