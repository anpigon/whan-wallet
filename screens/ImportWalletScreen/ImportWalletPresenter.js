import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Title,
  Text,
  Icon,
  Form,
  Item,
  Input,
  Label,
  Button
} from 'native-base';

import { grey600 } from '../../styles/colors';

const ImportWalletPresenter = ({
  username,
  privateKey,
}) => {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent><Icon name="close"/></Button>
        </Left>
        <Body><Title>계정 불러오기</Title></Body>
        <Right>
          <Button transparent><Text>노드</Text></Button>
        </Right>
      </Header>
      <Content padder>
        <Form>
          <Item floatingLabel>
            <Label>계정입력</Label>
            <Input value={username} />
          </Item>
          <Text note>최대 12자리 계정/알파벳 a-z / 숫자 1-5</Text>

          <Item floatingLabel>
            <Label>Private Key 입력</Label>
            <Input value={privateKey}/>
          </Item>
          <Text note>입력한 계정의 Activate Key (Private)를 입력해 주세요.</Text>
        </Form>

        <View style={{flexDirection:'row', marginTop: 30}}>
          <Icon name="shield" type="Foundation" style={{color: grey600}} />
          <Text style={{marginLeft: 10, color: grey600 }}>
            Whan Wallet은 홀더의 Private Key 정보를 절대 수집하지 않습니다. Private Key는 암호화되어 디바이스에 안전하게 저장합니다.
          </Text>
        </View>
        <View style={styles.bottom}>
          <Button full><Text>불러오기</Text></Button>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
});

export default ImportWalletPresenter;