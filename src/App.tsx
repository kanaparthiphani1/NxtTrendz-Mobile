/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, View, StatusBar, StyleSheet, Text} from 'react-native';

import Login from './screens/Login';
import {AppContextProvider, useAppContext} from './context/AppContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './screens/Home';
import Products from './screens/Products';
import Cart from './screens/Cart';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const UnAuthenticatedScreen = (): JSX.Element => {
  return <Login />;
};

const AuthenticatedScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          borderRadius: 15,
          height: 80,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Icon
                  name={focused ? 'home' : 'home-outline'}
                  size={30}
                  color="black"
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Icon
                  name={focused ? 'shirt' : 'shirt-outline'}
                  size={30}
                  color="black"
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Icon
                  name={focused ? 'cart' : 'cart-outline'}
                  size={30}
                  color="black"
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const ShowScreen = () => {
  const {isLoggedIn} = useAppContext();
  return isLoggedIn ? AuthenticatedScreen() : UnAuthenticatedScreen();
};

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <AppContextProvider>
        <NavigationContainer>
          <ShowScreen />
        </NavigationContainer>
      </AppContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default App;
