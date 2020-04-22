import React, {Component} from 'react';
import {
  SafeAreaView
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TranslatePage from './components/TranslatePage';
import MainPage from './components/MainPage';
import SplashPage from './components/SplashPage';


const Stack = createStackNavigator();
class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={'Splash'}>
            <Stack.Screen 
              name='Splash' 
              component={SplashPage} />
            <Stack.Screen 
              name='Main' 
              component={MainPage} />
            <Stack.Screen 
              name='Login' 
              component={LoginPage} />
            <Stack.Screen 
              name='Register' 
              component={RegisterPage} />
            <Stack.Screen 
              name='Translate' 
              component={TranslatePage} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }  
};

export default App;
