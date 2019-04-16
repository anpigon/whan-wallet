import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import ImportWalletPresenter from './ImportWalletPresenter';

import steem from 'steem';

class ImportWalletContainer extends Component {

  // static navigationOptions = { header: null }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      usernameError: false,
      usernameSuccess: false,
      password: '',
      passwordError: false,
      passwordSuccess: false,
      passwordMessage: undefined,
      loading: false,

      account: {},
      // activePubkey: undefined,
      // memoPubkey: undefined,
      // ownerPubkey: undefined,
      // postingPubkey: undefined,
    }
  }

  // 유저 정보 조회
  loadAccount = async () => {
    if(!this.state.username || this.state.username.length < 3) return false;
    if(this.state.username === this.state.account.name) return this.state.account;
    try {
      const [ account ] = await steem.api.getAccountsAsync([this.state.username]);
      console.log('account', account);

      if( account ) {
        this.setState({
          usernameError: false,
          usernameSuccess: true,
          account: account,
          // memoPubkey    : account.memo_key,
          // activePubkey  : account.active.key_auths[0][0],
          // ownerPubkey   : account.owner.key_auths[0][0],
          // postingPubkey : account.posting.key_auths[0][0],
        });
        return account;
      }
        
    } catch(e) {
      console.log(e);
      this.setState({
        usernameError: true,
        usernameSuccess: false,
        account: {},
      });
    }
    return null;
  }

  // 다음으로 이동
  next = async () => {
    const account = await this.loadAccount();
    if(!account) {
      return this.setState({
        usernameError: true,
        usernameSuccess: false,
        usernameMessage: 'Username does not exist!',
      });
    }
    
    if(this.state.passwordError) {
      return;// Alert.alert('ERROR', 'Incorrect Password!');
    }

    // 저장
    this.setState({
      loading: true
    }, async () => {
      const { password } = this.state;

      const wallet = SteemWallet.createFromAccount(account);
      if(password) wallet.setPassword(password);
      
      console.log('storeWallet:', wallet);
      this.props.storeWallet(wallet); // 지갑 저장
    })
  }

  // 패스워드 유효성 검사
  validPassword = () => {
    const { usernameSuccess, username, password, account } = this.state;
    let passwordMessage;
 
    if(!usernameSuccess || !password) {
      return this.setState({
        passwordError: false,
        passwordSuccess: false,
        passwordMessage,
      });
    }

    const {
      memo_key: memoPubkey,
      active: { key_auths: [[activePubkey]]},
      owner: { key_auths: [[ownerPubkey]]},
      posting: { key_auths: [[postingPubkey]]},
    } = account;

    if(password.startsWith('P')) {
      // master password
      try {
        const priKeys = steem.auth.getPrivateKeys(username, password); //active, activePubkey, memo, memoPubkey, owner, ownerPubkey, posting, postingPubkey,
        console.log(priKeys)
        if(ownerPubkey === priKeys.ownerPubkey) {
          passwordMessage = 'Master Password';
        } else {
          console.log('잘못된 패스워드4');
          return this.setState({
            passwordError: true,
            passwordSuccess: false,
            passwordMessage: 'Incorrect Password!',
          });
        }
      } catch(e1) {
        console.log('잘못된 패스워드1');
        return this.setState({
          passwordError: true,
          passwordSuccess: false,
          passwordMessage: 'Incorrect Password!',
        });
      }
    } else {
      if(!steem.auth.isWif(password)) {
        console.log('잘못된 패스워드2');
        return this.setState({
          passwordError: true,
          passwordSuccess: false,
          passwordMessage: 'Incorrect Password!',
        });
      }
      const pubKey = steem.auth.wifToPublic(password);
      console.log('pubKey:', pubKey);
      if(ownerPubkey === pubKey) {
        passwordMessage = 'Owner Key';
      } else if(activePubkey === pubKey) {
        passwordMessage = 'Active Key';
      } else if(postingPubkey === pubKey) {
        passwordMessage = 'Posting Key';
      } else {
        return this.setState({
          passwordError: true,
          passwordSuccess: false,
          passwordMessage: 'Incorrect Password!',
        });
      }
    }
    this.setState({
      passwordMessage,
      passwordError: false,
      passwordSuccess: true,
    });
  }

  // 계정 입력
  _handlerInputUsername = (username) => {
    this.setState({ 
      username: (username || '').trim(), 
      password: null 
    }, this.loadAccount);
  }

  _handlerInputPassword = (password) => {
    this.setState({ password }, this.validPassword);
  }

  render() {
    return (
      <ImportWalletPresenter
        username={this.state.username}
        onInputUsername={this._handlerInputUsername}
        password={this.state.password}
        onInputPassword={this._handlerInputPassword}
      />
    )
  }
}

export default ImportWalletContainer;