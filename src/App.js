import React, { Component } from 'react';
import styles from './App.less';
import WrapperRouter from 'reactRouters/wrapperRouter';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <WrapperRouter />
      </div>
    );
  }
}

export default App;
