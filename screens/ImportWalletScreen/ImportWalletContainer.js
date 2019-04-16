import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import ImportWalletPresenter from './ImportWalletPresenter';

class ImportWalletContainer extends Component {

  // static navigationOptions = { header: null }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImportWalletPresenter />
    )
  }
}

export default ImportWalletContainer;