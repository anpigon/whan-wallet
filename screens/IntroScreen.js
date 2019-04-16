import React, { Component } from 'react';
import styled from 'styled-components';
import { Platform, StyleSheet, View, TouchableOpacity, Linking, Image } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
} from 'native-base';

const CenterBox = styled.View`
  align-items: center;
  padding-bottom: 20;
`;

const AppIcon = styled.Image`
  width: 72;
  height: 72;
`;

const WelcomeMessage = styled.Text`
  margin-top: 30;
  font-size: 20;
  font-family: ${Platform.select({ android: 'monospace', ios: 'Courier' })};
  letterSpacing: 3;
`;

const AppLabel = styled.Text`
  margin-top: 10;
  font-size: 35;
`;

const AppTitle = styled(AppLabel)`
  font-weight: bold;
`;

const BottomBox = styled.View`
  position: absolute;
  bottom: 50;
  width: 100%;
  padding-horizontal: 50;
`;

class IntroScreen extends Component {

  render() {
    return (
      <Container style={styles.container}>
        <CenterBox>
          <AppIcon source={require('../assets/icon.png')} />
          <WelcomeMessage>WELCOME TO</WelcomeMessage>
          <AppLabel><AppTitle>WHAN</AppTitle>Wallet</AppLabel>
        </CenterBox>
        <BottomBox>
          <Button block rounded onPress={() => this.props.navigation.navigate('ImportWallet')}><Text>계정 불러오기</Text></Button>
          <View style={{flexDirection:'row', justifyContent: "center", marginTop: 20 }}>
            <Text style={{color: '#777'}}>아직 계정이 없으신가요? </Text>
            <TouchableOpacity onPress = {()=>Linking.openURL('https://www.steempeople.com/')}>
              <Text>계정 생성하기</Text>
            </TouchableOpacity>
          </View>
        </BottomBox>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  }
})

export default IntroScreen;