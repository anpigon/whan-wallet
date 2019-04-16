import React from 'react';
import { LinearGradient } from 'expo';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import {
  Icon,
} from 'native-base';

import { Header, Input, Button } from 'react-native-elements';

import { grey500, grey600 } from '../../styles/colors';

import Container from '../../components/Container';

const ImportWalletPresenter = ({
  username,
  privateKey,
  error,
}) => {
  return (
    <Container>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" // or directly
        leftComponent={{ icon: 'close', color: '#fff' }}
        centerComponent={{ text: '계정불러오기', style: { color: '#fff' } }}
        rightComponent={{ text: '노드', style: { color: '#fff' } }}
        containerStyle={{
          backgroundColor: '#3D6DCC',
          justifyContent: 'space-around',
        }}
      />
      <KeyboardAvoidingView 
        style={styles.content} 
        behavior="padding" 
        enabled>
        <View style={styles.form}>
          <Input
            containerStyle={{ marginTop: 35 }}
            value={username}
            label={username?'계정 입력':null}
            placeholder={!username?'계정 입력':null}
            labelStyle={{ fontSize: 14, fontWeight: '100' }}
            errorStyle={{ color: error&&error.username ? 'red' : grey500 }}
            errorMessage={ error&&error.username ? error.username : '최대 16자리 계정/알파벳 a-z / 숫자 1-5'}
            shake
            />

          <Input
            containerStyle={{ marginTop: 25 }}
            value={privateKey}
            label={privateKey?'Private Key 입력':null}
            placeholder={!privateKey?'Private Key 입력':null}
            labelStyle={{ fontSize: 14, fontWeight: '100' }}
            errorStyle={{ color: error&&error.privateKey ? 'red' : grey500 }}
            errorMessage={ error&&error.privateKey ? error.privateKey : '입력한 계정의 Activate Key (Private)를 입력해 주세요.'}
            shake
          />
          
          <View style={{flexDirection:'row', marginTop: 15, paddingTop:15, borderColor:'#eee', borderTopWidth: 1, width: '90%', marginHorizontal: 10 }}>
            <Icon name="shield" type="Foundation" style={{ color: grey600 }} />
            <Text style={{ marginLeft: 10, color: grey600, flexWrap: 'wrap' }}>
              Whan Wallet은 홀더의 Private Key 정보를 절대 수집하지 않습니다. Private Key는 암호화되어 디바이스에 안전하게 저장합니다.
            </Text>
          </View>
        </View>

        <Button
          title="불러오기"
          type="solid"
          buttonStyle={{ height: 60, borderRadius: 0 }}
          // ViewComponent={LinearGradient} // Don't forget this!
          // linearGradientProps={{
          //   colors: ['transparent', 'black'],
          //   start: { x: 0, y: 0 },
          //   end: { x: 0, y: 1 },
          // }}
        />
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: 10,
  },
  hint: {
    color: grey500,
    fontSize: 14,
  },
  bottom: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // marginBottom: 36
  }
});

export default ImportWalletPresenter;