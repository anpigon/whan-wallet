import React from 'react';
import { 
  createSwitchNavigator, 
  createStackNavigator, 
  createAppContainer 
} from 'react-navigation';

// import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import IntroScreen from '../screens/IntroScreen';

// 인트로 화면
const IntroStack = createStackNavigator({ 
  Intro: IntroScreen 
}, {
  defaultNavigationOptions: {
    header: null
  }
}); 

const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    Intro: IntroStack,
    // AuthLoading: AuthLoadingScreen,
  },
  { 
    // initialRouteName: 'AuthLoading' 
  }
));

export default AppNavigator;