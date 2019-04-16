import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Constants, SecureStore } from 'expo';
// import { AsyncStorage } from 'react-native';
import { Container } from 'native-base';
// import { connect } from 'react-redux';
// import { TINT_COLOR } from '../constants/Colors';
// import { setUsername } from '../reducers/steemReducer';

import Common from '../constants/Common';

import { withConsumer } from '../context/Store';

class AuthLoadingScreen extends React.Component {

  _goMainScreen = () => this.props.navigation.navigate('App');
  _goLoginScreen = () => this.props.navigation.navigate('Auth');

  async componentDidMount() {
    console.log('Auth Check!!!!');
    
    // 사용자 토큰 정보 조회
    const userToken = await SecureStore.getItemAsync(Common.USER_TOKEN_KEY, { keychainService: Constants.deviceId });
    if ( !userToken ) return this._goLoginScreen();
    
    try {
      const {
        access_token: accessToken,
        issued_at,
        expires_in,
        username
      }  = JSON.parse(userToken);
      
      // 1. exp 날짜 체크  
      if ( (issued_at + expires_in) <= (Date.now() / 1000) ) {
        // 만료일이 지났으면 토큰 삭제
        console.log('expired token!!!'); // 토큰 유효기간이 만료되었습니다.
        await SecureStore.deleteItemAsync(Common.USER_TOKEN_KEY, { keychainService: Constants.deviceId });
        this.goLoginScreen();
      } else {
        // 인증(로그인) 상태
        this.props.setAuthInfo({ username, accessToken });
        this._goMainScreen();
      }
      
    } catch(error) {
      console.error(error);
      await SecureStore.deleteItemAsync('userToken', { keychainService: Constants.deviceId });
      this._goLoginScreen();
    }
  };

  render() {
    return (
      <Container style={{flex:1, justifyContent:'center' }}>
        <ActivityIndicator size='large' />
      </Container>
    );
  }
}

export default withConsumer(AuthLoadingScreen);