import React from 'react';
import { 
  createSwitchNavigator, 
  createStackNavigator, 
  createAppContainer 
} from 'react-navigation';
import { StyleProvider } from 'native-base';
import { ThemeProvider } from 'react-native-elements';

// import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import IntroScreen from '../screens/IntroScreen';
import ImportWalletScreen from '../screens/ImportWalletScreen'

// 인트로 화면
const IntroStack = createStackNavigator({ 
  Intro: IntroScreen,
  ImportWallet: ImportWalletScreen,
}, {
  headerMode: 'screen',
  defaultNavigationOptions: {
    header: null
  }
}); 

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Intro: IntroStack,
    // AuthLoading: AuthLoadingScreen,
  },
  { 
    // initialRouteName: 'AuthLoading' 
  }
));

export default () => (
  <ThemeProvider>
    <AppContainer />
  </ThemeProvider>
);