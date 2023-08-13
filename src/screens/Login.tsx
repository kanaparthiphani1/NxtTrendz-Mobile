import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useAppContext} from '../context/AppContext';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const context = useAppContext();

  const updateUserName = (text: string) => {
    setUserName(text);
  };

  const updatePassword = (text: string) => {
    setPassword(text);
  };

  const onSubmitSuccess = (jwtToken: string) => {
    context?.updateLoginState(true);
  };

  const onSubmitFailure = (errorMsg: string) => {};

  const submitForm = async () => {
    const userDetails = {username: userName, password};
    console.log({userDetails});
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      console.log('passed');
      onSubmitSuccess(data.jwt_token);
    } else {
      console.log('failed');

      onSubmitFailure(data.error_msg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperCont}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{
            uri: 'https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png',
          }}
        />
      </View>
      <View style={styles.lowerCont}>
        <View style={styles.imgCont}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={{
              uri: 'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png',
            }}
          />
        </View>
        <View style={styles.formCont}>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.input}
              value={userName}
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={updateUserName}
            />
          </View>
          <View style={styles.inputCont}>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              value={password}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={updatePassword}
            />
          </View>
          <Pressable style={styles.loginBtn} onPress={submitForm}>
            <Text style={styles.loginColor}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperCont: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 6,
    paddingHorizontal: 10,

    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '90%',
  },
  lowerCont: {
    flex: 1,
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 10,

    elevation: 6,
    shadowColor: 'grey',
    shadowOffset: {
      height: 19,
      width: 19,
    },
  },
  imgCont: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    height: 79,
  },
  formCont: {
    flex: 3,
  },
  inputCont: {
    backgroundColor: '#e2e8f0',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: 'transparent',
  },
  loginBtn: {
    width: '90%',
    backgroundColor: 'blue',
    height: 50,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderRadius: 10,
  },
  loginColor: {
    color: 'white',
    fontSize: 18,
  },
});
